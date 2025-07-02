
import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export interface UserProfile {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
}

export async function findUserByEmail(email: string): Promise<UserProfile | null> {
  const emailToSearch = email.trim().toLowerCase();
  
  try {
    console.log('Searching for user with email:', emailToSearch);
    
    // First try exact case-sensitive match
    const { data: profileUser, error: profileError } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name')
      .eq('email', emailToSearch)
      .maybeSingle();

    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error searching profiles:', profileError);
      throw profileError;
    }

    if (profileUser) {
      console.log('Found user in profiles:', profileUser);
      return profileUser;
    }

    // If not found with exact match, try case-insensitive search
    const { data: profileUserInsensitive, error: insensitiveError } = await supabase
      .from('profiles')
      .select('id, email, first_name, last_name')
      .ilike('email', emailToSearch)
      .maybeSingle();

    if (insensitiveError && insensitiveError.code !== 'PGRST116') {
      console.error('Error in case-insensitive search:', insensitiveError);
      throw insensitiveError;
    }

    if (profileUserInsensitive) {
      console.log('Found user with case-insensitive search:', profileUserInsensitive);
      return profileUserInsensitive;
    }

    // Also check auth.users table for recently created accounts
    console.log('Checking auth.users table...');
    const { data: authUsersResponse, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error checking auth users:', authError);
    } else if (authUsersResponse?.users) {
      // Find user with matching email
      const foundUser = authUsersResponse.users.find((authUser: User) => 
        authUser.email && authUser.email.toLowerCase() === emailToSearch
      );
      
      if (foundUser && foundUser.email) {
        console.log('Found user in auth.users but not in profiles, creating profile...');
        
        // Create profile for this user
        const { data: newProfile, error: createError } = await supabase
          .from('profiles')
          .insert({
            id: foundUser.id,
            email: foundUser.email,
            first_name: foundUser.user_metadata?.first_name || foundUser.user_metadata?.given_name || null,
            last_name: foundUser.user_metadata?.last_name || foundUser.user_metadata?.family_name || null,
            company_name: foundUser.user_metadata?.company_name || null
          })
          .select('id, email, first_name, last_name')
          .single();

        if (createError) {
          console.error('Error creating profile:', createError);
        } else {
          console.log('Created profile for auth user:', newProfile);
          return newProfile;
        }
      }
    }

    console.log('User not found in any table');
    return null;
  } catch (error) {
    console.error('Error in findUserByEmail:', error);
    throw error;
  }
}
