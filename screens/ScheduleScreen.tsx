import { View, StyleSheet } from 'react-native';
import { GlobalStyles } from '../styles/globalStyles';

const { colors } = GlobalStyles;

function ScheduleScreen() {
  // return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondary,
  },
});

export default ScheduleScreen;
