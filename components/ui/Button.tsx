import { Pressable, StyleSheet, Text, View } from 'react-native';

type ButtonProps = React.PropsWithChildren<{
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}>;

function Button({ children, onPress, variant = 'primary' }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles[variant], pressed && styles.pressed]}
      onPress={onPress}
    >
      <View>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  primary: {
    width: '100%',
    backgroundColor: '#6200ee',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  secondary: {
    width: '100%',
    backgroundColor: '#121212',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
