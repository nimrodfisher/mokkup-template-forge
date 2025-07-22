
import { useState, useEffect, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const profileCreationRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Handle profile creation for new users
        if (event === 'SIGNED_IN' && session?.user) {
          const userId = session.user.id;
          
          // Prevent duplicate profile creation attempts
          if (profileCreationRef.current.has(userId)) {
            return;
          }
          
          profileCreationRef.current.add(userId);
          
          setTimeout(async () => {
            try {
              console.log('Checking/creating profile for user:', userId);
              
              // Check if profile exists
              const { data: existingProfile, error: checkError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

              if (checkError && checkError.code !== 'PGRST116') {
                console.error('Error checking profile:', checkError);
                profileCreationRef.current.delete(userId);
                return;
              }

              // If profile doesn't exist, create it
              if (!existingProfile) {
                console.log('Creating new profile for user:', userId);
                
                const { error: insertError } = await supabase
                  .from('profiles')
                  .insert({
                    id: userId,
                    email: session.user.email || '',
                    first_name: session.user.user_metadata?.first_name || 
                               session.user.user_metadata?.given_name || null,
                    last_name: session.user.user_metadata?.last_name || 
                              session.user.user_metadata?.family_name || null,
                    company_name: session.user.user_metadata?.company_name || null
                  });

                if (insertError) {
                  console.error('Error creating profile:', insertError);
                } else {
                  console.log('Profile created successfully');
                }
              } else {
                console.log('Profile already exists:', existingProfile);
              }
            } catch (error) {
              console.error('Error in profile creation process:', error);
            } finally {
              // Clean up the reference after processing
              profileCreationRef.current.delete(userId);
            }
          }, 100);
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, session, loading };
}
