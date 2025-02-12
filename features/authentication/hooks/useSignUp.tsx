import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { signUp } from '../../../services/authentication/userAuth';
import { useAuth } from '../../../context/Auth/useAuth';
import SignUpSuccessScreen from '../../../screens/SignUpSuccessScreen';

export function useSignUp() {
  const { getUserID } = useAuth();
  const { mutate: signUpWithEmail, isPending } = useMutation({
    mutationFn: (data: { email: string; password: string; fullName: string }) =>
      signUp(data),
    onSuccess: (data) => {
      if (!data.user) {
        throw new Error('No user found');
      }
      getUserID(data.user.id);
      Toast.show({
        type: 'success',
        text1: 'Welcome',
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

  return { signUpWithEmail, isPending };
}
