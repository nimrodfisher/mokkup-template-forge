
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // SECURITY FIX: Use setTimeout(0) to prevent infinite recursion/deadlock
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(async () => {
            try {
              // Check if profile exists, if not create it
              const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session.user.id)
                .single();
                
              if (!profile) {
                await supabase
                  .from('profiles')
                  .insert({
                    id: session.user.id,
                    email: session.user.email,
                    first_name: session.user.user_metadata?.first_name || session.user.user_metadata?.given_name,
                    last_name: session.user.user_metadata?.last_name || session.user.user_metadata?.family_name,
                    company_name: session.user.user_metadata?.company_name,
                    avatar_url: session.user.user_metadata?.avatar_url
                  });
              }
            } catch (error) {
              console.error('Error handling profile creation:', error);
            }
          }, 0);
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
