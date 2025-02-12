import { sub } from 'date-fns';
import supabase from '../supabaseClient';

export const loginWithEmail = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const signUp = async ({
  email,
  password,
  fullName,
}: {
  email: string;
  password: string;
  fullName: string;
}) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        fullName,
        confirmPassword: password,
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
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
    throw new Error(error.message);
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

export const getUserProfile = async (id: string) => {
  let { data: profiles, error } = await supabase
    .from('profiles')
    .select('name, role')
    .eq('id', id);
  if (error) {
    throw new Error(error.message);
  }
  return profiles;
};
