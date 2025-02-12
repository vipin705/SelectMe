import { View, StyleSheet } from 'react-native';
import Button from '../components/ui/Button';
import { signOut } from '../services/authentication/userAuth';
import { GlobalStyles } from '../styles/globalStyles';

const { colors } = GlobalStyles;

function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          variant='primary'
          onPress={() => {
            signOut();
          }}
        >
          Logout
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
    backgroundColor: colors.secondary,
  },
  buttonContainer: {
    width: '70%',
  },
});

export default ProfileScreen;
