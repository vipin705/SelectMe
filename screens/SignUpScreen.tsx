import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import  AuthForm  from '../components/authentication/AuthForm';
import { SignUpFormValues } from '../modals/form/form';
import { signUp } from '../services/authentication/userAuth';

function SignUpScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { navigate } = navigation;

  function handleSignUp(values: SignUpFormValues) {
    console.log('Sign up Values:', values);
    signUp(values.email as string, values.password as string);
   // navigation.navigate('Login'); // Navigate to the home screen after sign up
  }

  return (
    <View style={styles.container}>
      <AuthForm isLogin={false} submitHandler={handleSignUp} navigation={navigation} />
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



