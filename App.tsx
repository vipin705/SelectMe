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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SignUpSuccessScreen from './screens/SignUpSuccessScreen';

const Stack = createStackNavigator();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 0,
    },
  },
});

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
      <Stack.Navigator detachInactiveScreens={true} initialRouteName='Login'>
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
            <Stack.Screen
              name='SignUpSuccess'
              component={SignUpSuccessScreen}
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
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Root />
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}
