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

const Tab = createBottomTabNavigator();

const tabBarHeight = Platform.OS === 'ios' ? 90 : 80;

const tabBarOptions: BottomTabNavigationOptions = {
  tabBarStyle: { backgroundColor: '#6200ee', height: tabBarHeight },
  tabBarActiveTintColor: '#ffffff',
  tabBarInactiveTintColor: '#cccccc',
  tabBarLabelStyle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabBarItemStyle: {
    padding: 8,
  },
  headerStyle: {
    backgroundColor: '#6200ee',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

function Tabs() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
      <Tab.Screen
        name='Home'
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
