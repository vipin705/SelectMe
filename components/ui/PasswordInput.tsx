import { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/globalStyles';

const { colors } = GlobalStyles;

type PasswordInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
};

const PasswordInput = ({
  placeholder,
  value,
  onChangeText,
  onBlur,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor='#c0c0c0'
        value={value}
        onChangeText={onChangeText}
        onBlur={(e) => onBlur(e)}
        secureTextEntry={!showPassword}
      />
      <TouchableOpacity
        onPress={toggleShowPassword}
        style={styles.iconContainer}
      >
        <Ionicons
          name={showPassword ? 'eye-off' : 'eye'}
          size={18}
          color={colors.primary700}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  iconContainer: {
    padding: 10,
  },
});

export default PasswordInput;
