import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import { StatusBar } from 'expo-status-bar';
import Tabs from './navigators/Tabs';
import AuthProvider from './context/Auth/AuthContext';
import {
  checkAuthState,
  authChangeState,
} from './services/authentication/userAuth';

const Stack = createStackNavigator();

function Root() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await checkAuthState();
      setIsSignedIn(!!session);
    };

    checkAuth();

    const subscription = authChangeState(setIsSignedIn);

    return () => subscription.unsubscribe();
  }, [checkAuthState, authChangeState]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        {!isSignedIn && (
          <>
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='SignUp'
              component={SignUpScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
        {isSignedIn && (
          <Stack.Screen
            name='Home'
            component={Tabs}
            options={{
              headerShown: false,
            }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <AuthProvider>
        <Root />
      </AuthProvider>
    </>
  );
}
