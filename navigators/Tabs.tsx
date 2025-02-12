import { StyleSheet, Platform } from 'react-native';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateTeam from '../screens/CreateTeam';
import ScheduleScreen from '../screens/ScheduleScreen';
import IconButton from '../components/ui/IconButton';
import { signOut } from '../services/authentication/userAuth';
import { GlobalStyles } from '../styles/globalStyles';

const Tab = createBottomTabNavigator();

const tabBarHeight = Platform.OS === 'ios' ? 90 : 80;
const { colors } = GlobalStyles;

const tabBarOptions: BottomTabNavigationOptions = {
  tabBarStyle: { backgroundColor: colors.primary700, height: tabBarHeight },
  tabBarActiveTintColor: colors.accent500,
  tabBarInactiveTintColor: colors.gray500,
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabBarItemStyle: {
    padding: 8,
  },
  headerStyle: {
    backgroundColor: colors.primary700,
  },
  headerTintColor: colors.accent500,
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: () => (
    <IconButton
      icon='exit'
      size={24}
      color={colors.accent500}
      onPress={() => signOut()}
    />
  ),
};

function Tabs() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen
        name='Dashboard'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='home' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='Create Team'
        component={CreateTeam}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='people' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='Schedule'
        component={ScheduleScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='calendar' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name='person' color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});

export default Tabs;
