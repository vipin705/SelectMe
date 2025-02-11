import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { signOut } from '../services/authentication/userAuth';

function ProfileScreen() {
  return(
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={()=>signOut()}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'flex-start',
    marginBottom: 30,
    padding:10
  },
  button: {
    width: '20%',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
