import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AuthForm from '../components/authentication/AuthForm';
import { SignUpFormValues } from '../modals/form/form';
import { GlobalStyles } from '../styles/globalStyles';
import { useSignUp } from '../features/authentication/hooks/useSignUp';

const { colors } = GlobalStyles;
function SignUpScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { navigate } = navigation;
  const { signUpWithEmail, isPending } = useSignUp();

  function handleSignUp(values: SignUpFormValues) {
    const { email, password, name } = values;
    signUpWithEmail(
      { email, password, fullName: name },
      {
        onSuccess: () => navigate('SignUpSuccess'),
      }
    );
  }

  return (
    <View style={styles.container}>
      <AuthForm isLogin={false} submitHandler={handleSignUp} />
      <TouchableOpacity onPress={() => navigate('Login')}>
        <Text style={styles.linkText}>Back to login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  linkText: {
    color: colors.primary700,
    marginTop: 1,
    textAlign: 'center',
  },
});

export default SignUpScreen;
