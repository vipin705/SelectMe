import { useMutation } from '@tanstack/react-query';
import { loginWithEmail } from '../../../services/authentication/userAuth';
import Toast from 'react-native-toast-message';
import { useAuth } from '../../../context/Auth/useAuth';

export function useLogin() {
  const { getUserID } = useAuth();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      loginWithEmail(data),
    onSuccess: (data) => {
      if (!data.user) {
        throw new Error('No user found');
      }
      Toast.show({
        type: 'success',
        text1: 'Welcome back',
      });
    },
    onError: (error) => {
      Toast.show({
        type: 'error',
        text1: error.message,
        text1Style: { fontWeight: 'bold' },
        text2: 'Please try again',
      });
    },
  });
  return { login, isPending };
}
