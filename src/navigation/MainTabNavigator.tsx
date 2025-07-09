import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useAppSelector} from '@redux/hooks';
import HomeScreen from '@/screens/bottom/HomeScreen';
import NotificationsScreen from '@/screens/bottom/NotificationsScreen';
import ProfileScreen from '@/screens/bottom/ProfileScreen';
import MainContent from '@/screens/bottom/MainContent';
import MapScreen from '@/screens/MapScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const MainTabNavigator: React.FC = () => {
  const {isDarkMode} = useAppSelector(state => state.theme);

  const theme = {
    backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
    activeColor: '#3B82F6',
    inactiveColor: isDarkMode ? '#9CA3AF' : '#6B7280',
    borderColor: isDarkMode ? '#374151' : '#E5E7EB',
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'MainContent') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Map') {
            iconName = focused ? 'map' : 'map-outline';
          } else if (route.name === 'Notifications') {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.activeColor,
        tabBarInactiveTintColor: theme.inactiveColor,
        tabBarStyle: {
          backgroundColor: theme.backgroundColor,
          borderTopColor: theme.borderColor,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 20,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        headerShown: false,
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="MainContent"
        component={MainContent}
        options={{
          tabBarLabel: 'Content',
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarLabel: 'Map',
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          tabBarLabel: 'Notifications',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
