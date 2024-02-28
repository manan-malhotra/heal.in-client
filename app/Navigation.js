import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Provider as PaperProvider } from 'react-native-paper';
import Dashboard from './Dashboard';
import DashboardIcon from '../assets/images/dashboard.png';
import ProfileIcon from '../assets/images/profile.png';
import { Image } from 'react-native';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'dashboard', title: 'Dashboard', icon: DashboardIcon },
    { key: 'Profile', title: 'Profile', icon: ProfileIcon},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: Dashboard,
    Profile: Profile,
  });

  const theme = {
    colors: {
      primary: '#3340B0', // Change the color of the ripple effect here
    }
  };

  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: '#3340B0', height: 'auto' }} 
        activeColor="white" 
        inactiveColor="grey" 
        shifting={false}
        renderIcon={({ route, focused, color }) => (
          <Image
            source={route.icon}
            style={{ width: 24, height: 30, tintColor: focused ? color : 'grey' }}
          />
        )}
      />
    </PaperProvider>
  );
};

export default TabNavigation;
