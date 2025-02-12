import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet, Text } from 'react-native';
import { GlobalStyles } from '../styles/globalStyles';
import { useEffect } from 'react';
import { getUserProfile } from '../services/authentication/userAuth';
import { useAuth } from '../context/Auth/useAuth';

const { colors } = GlobalStyles;

function HomeScreen() {
  const { userId } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return;
      const user = await getUserProfile(userId);
    };
    fetchUser();
  }, [userId, getUserProfile]);

  return (
    <View style={styles.container}>
      <Text>Welcome</Text>
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
});

export default HomeScreen;
