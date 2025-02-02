import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { NavigationProp } from '@react-navigation/native';
import AuthForm from '../components/authentication/AuthForm';
import { LoginFormValues } from '../modals/form/form';
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyles } from '../styles/globalStyles';

const { colors } = GlobalStyles;

function LoginScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { navigate } = navigation;

  function handleLogin(values: LoginFormValues) {
    console.log('Login Values:', values);
    navigation.navigate('Home');
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
