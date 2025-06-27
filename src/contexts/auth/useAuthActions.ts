
import { useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export function useAuthActions() {
  const [loading, setLoading] = useState(false);

  const signUp = async (email: string, password: string, userData?: any) => {
    try {
      setLoading(true);
      
      // SECURITY FIX: Add emailRedirectTo to prevent authentication failures
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('SignUp error:', error);
        // SECURITY FIX: Sanitize error messages to prevent information disclosure
        const sanitizedMessage = error.message.includes('already registered') 
          ? 'An account with this email already exists'
          : 'Unable to create account. Please try again.';
        toast.error(sanitizedMessage);
      } else {
        toast.success('Check your email to confirm your account!');
      }
      
      return { error };
    } catch (error) {
      console.error('SignUp catch error:', error);
      toast.error('An unexpected error occurred during sign up');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('SignIn error:', error);
        // SECURITY FIX: Sanitize error messages
        const sanitizedMessage = error.message.includes('Invalid login credentials')
          ? 'Invalid email or password'
          : 'Unable to sign in. Please try again.';
        toast.error(sanitizedMessage);
      } else {
        toast.success('Welcome back!');
      }
      
      return { error };
    } catch (error) {
      console.error('SignIn catch error:', error);
      toast.error('An unexpected error occurred during sign in');
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('Starting Google sign in...');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('Google sign in error:', error);
        toast.error('Unable to sign in with Google. Please try again.');
      }
      
      return { error };
    } catch (error) {
      console.error('Google sign in catch error:', error);
      toast.error('An unexpected error occurred with Google sign in');
      return { error };
    }
  };

  const signInWithLinkedIn = async () => {
    try {
      console.log('Starting LinkedIn sign in...');
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        console.error('LinkedIn sign in error:', error);
        toast.error('Unable to sign in with LinkedIn. Please try again.');
      }
      
      return { error };
    } catch (error) {
      console.error('LinkedIn sign in catch error:', error);
      toast.error('An unexpected error occurred with LinkedIn sign in');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
        toast.error('Unable to sign out. Please try again.');
      } else {
        toast.success('Signed out successfully');
      }
    } catch (error) {
      console.error('Sign out catch error:', error);
      toast.error('An unexpected error occurred during sign out');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: any, user: User | null) => {
    try {
      if (!user) throw new Error('No user logged in');
      
      // SECURITY FIX: Sanitize input data to prevent XSS
      const sanitizedData = Object.keys(data).reduce((acc, key) => {
        if (typeof data[key] === 'string') {
          acc[key] = data[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        } else {
          acc[key] = data[key];
        }
        return acc;
      }, {} as any);
      
      const { error } = await supabase
        .from('profiles')
        .update(sanitizedData)
        .eq('id', user.id);
      
      if (error) {
        console.error('Update profile error:', error);
        toast.error('Unable to update profile. Please try again.');
      } else {
        toast.success('Profile updated successfully');
      }
      
      return { error };
    } catch (error) {
      console.error('Update profile catch error:', error);
      toast.error('An unexpected error occurred while updating profile');
      return { error };
    }
  };

  return {
    loading,
    signUp,
    signIn,
    signInWithGoogle,
    signInWithLinkedIn,
    signOut,
    updateProfile,
  };
}
