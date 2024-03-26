import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Provider as PaperProvider } from 'react-native-paper';
import UserDashboard from './userDashboard';
import DashboardIcon from '../assets/images/dashboard.png';
import ProfileIcon from '../assets/images/profile.png';
import { Image } from 'react-native';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const UserDashboardNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'dashboard', title: 'Dashboard', icon: DashboardIcon },
    { key: 'profile', title: 'Profile', icon: ProfileIcon},
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: UserDashboard,
    profile: Profile,
  });

  const theme = {
    colors: {
      primary: '#3340B0', 
    }
  };

  return (
    <PaperProvider theme={theme}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: '#3340B0', height: '15%' }} 
        activeColor="white" 
        inactiveColor="grey" 
        shifting={false}
        renderIcon={({ route, focused, color }) => (
          <Image
            source={route.icon}
            style={{height:'100%',width:'70%', tintColor: focused ? color : 'grey' }}
          />
        )}
      />
    </PaperProvider>
  );
};

export default UserDashboardNavigation;
