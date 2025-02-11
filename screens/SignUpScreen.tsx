import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import  AuthForm  from '../components/authentication/AuthForm';
import { SignUpFormValues } from '../modals/form/form';
import { signUp } from '../services/authentication/userAuth';
// import supabase from '../services/supabaseClient';

function SignUpScreen({ navigation }: { navigation: NavigationProp<any> }) {
  const { navigate } = navigation;

  async function handleSignUp(values: SignUpFormValues) {

    const { email, password, fullName,  } = values;
    await signUp(email, password, fullName, navigation);
    
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
    backgroundColor: "#f8f9fa",
  },
  linkText: {
    color: '#6200ee',
    marginTop: 1,
    textAlign: 'center',
  },
});


export default SignUpScreen;
