import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';

import {
  loginValidationSchema,
  signUpValidation,
} from '../../modals/form/form';
import { GlobalStyles } from '../../styles/globalStyles';
import PasswordInput from '../ui/PasswordInput';
import { useLogin } from '../../features/authentication/hooks/useLogin';

const { colors } = GlobalStyles;
type AuthFormProps = {
  isLogin: boolean;
  submitHandler: (values: any) => void;
};

function AuthForm({ isLogin, submitHandler }: AuthFormProps) {
  const { isPending } = useLogin();
  const formValidation = isLogin ? loginValidationSchema : signUpValidation;
  const initialFormValues = isLogin
    ? { email: '', password: '' }
    : { name: '', email: '', password: '', confirmPassword: '' };

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Formik
          initialValues={initialFormValues}
          validationSchema={formValidation}
          onSubmit={(values) => {
            submitHandler(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={styles.formContainer}>
              <Text style={styles.title}>
                {isLogin ? 'Welcome back' : 'Create a new account'}
              </Text>
              {/* <Text style={styles.title}>Create a new account</Text> */}
              {!isLogin && (
                <>
                  <Text style={styles.inputTitle}>Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder='John Doe'
                    placeholderTextColor='#c0c0c0'
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                    keyboardType='default'
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </>
              )}

              <Text style={styles.inputTitle}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder='john.doe@email.com'
                placeholderTextColor='#c0c0c0'
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType='email-address'
                autoCapitalize='none'
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <Text style={styles.inputTitle}>Password</Text>
              <PasswordInput
                placeholder='Password'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              {!isLogin && (
                <>
                  <Text style={styles.inputTitle}>Confirm Password</Text>
                  <PasswordInput
                    placeholder='Confirm password'
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword as string}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleSubmit();
                }}
                disabled={isSubmitting || isPending}
              >
                <Text style={styles.buttonText}>
                  {isLogin ? 'Login' : 'Sign up'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
  keyboardAvoidingView: {
    width: '100%',
    alignItems: 'center',
  },
  formContainer: {
    width: '90%',
    backgroundColor: 'transparent',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.primary700,
  },
  inputTitle: {
    color: colors.primary700,
    marginBottom: 5,
    fontSize: 14,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: '#000',
  },
  button: {
    width: '100%',
    backgroundColor: colors.primary700,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  pressed: {
    backgroundColor: '#404040',
  },
});

export default AuthForm;
