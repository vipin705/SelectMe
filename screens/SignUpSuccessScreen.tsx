import { NavigationProp } from '@react-navigation/native';
import { View, StyleSheet, Text } from 'react-native';
import Button from '../components/ui/Button';
import { GlobalStyles } from '../styles/globalStyles';

const { colors } = GlobalStyles;

function SignUpSuccessScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const { navigate } = navigation;
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>You have successfully signed up</Text>
        <Text style={styles.text}>
          Please check your email to verify your account
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          variant='primary'
          onPress={() => {
            navigate('Login');
          }}
        >
          Return to login
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginBottom: 5,
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 20,
    color: colors.primary700,
  },
  buttonContainer: {
    width: '50%',
    height: 50,
  },
});

export default SignUpSuccessScreen;
