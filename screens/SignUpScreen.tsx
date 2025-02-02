import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import AuthForm from '../components/authentication/AuthForm';
import { SignUpFormValues } from '../modals/form/form';

function SignUpScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { navigate } = navigation;

  function handleSignUp(values: SignUpFormValues) {
    console.log('Sign up Values:', values);
    navigation.navigate('Home'); // Navigate to the home screen after sign up
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
    backgroundColor: '#D9D9D9',
  },
  linkText: {
    color: '#6200ee',
    marginTop: 1,
    textAlign: 'center',
  },
});

export default SignUpScreen;
