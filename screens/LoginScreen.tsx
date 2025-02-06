import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { NavigationProp } from '@react-navigation/native';
import AuthForm from '../components/authentication/AuthForm';
import { LoginFormValues } from '../modals/form/form';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyles } from '../styles/globalStyles';
import { useAuth } from '../context/Auth/useAuth';

const { colors } = GlobalStyles;

function LoginScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { navigate } = navigation;
  const { login } = useAuth();

  function handleLogin(values: LoginFormValues) {
    const { email, password } = values;
    login(email as string, password as string);
  }

  return (
    <View style={styles.container}>
      <AuthForm isLogin submitHandler={handleLogin} />
      <TouchableOpacity onPress={() => navigate('SignUp')}>
        <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  linkText: {
    color: '#6200ee',
    marginTop: 1,
    textAlign: 'center',
  },
});

export default LoginScreen;
