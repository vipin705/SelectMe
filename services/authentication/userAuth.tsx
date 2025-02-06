import { sub } from 'date-fns';
import supabase from '../supabaseClient';

export const loginWithEmail = async (email: string, password: string) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    console.error('Error:', error.message);
    return;
  }
  return data.session?.access_token;
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    console.error('Sign-up error:', error.message);
  } else {
    console.log('Signed up successfully:', data);
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Sign-out error:', error.message);
  } else {
    console.log('Signed out successfully');
  }
};

export const checkAuthState = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error('Error fetching session:', error.message);
  } else if (session) {
    return session;
  } else {
    console.log('No user is signed in.');
  }
};

export const authChangeState = (
  fn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    fn(!!session);
  });

  return subscription;
};
