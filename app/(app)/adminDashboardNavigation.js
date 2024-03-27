import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Provider as PaperProvider } from 'react-native-paper';
import { Image, StyleSheet } from 'react-native';
import DashboardIcon from '../../assets/images/dashboard.png';
import ProfileIcon from '../../assets/images/profile.png';
import Profile from '../Profile';
import AdminDashboard from '../adminDashboard';

const Tab = createBottomTabNavigator();

const AdminDashboardNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'dashboard', title: 'Dashboard', icon: DashboardIcon },
    { key: 'profile', title: 'Profile', icon: ProfileIcon },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    dashboard: AdminDashboard,
    profile: Profile
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

const styles = StyleSheet.create({

  gradient: {
    width: '100%',
    height: '100%',
  },

});

export default AdminDashboardNavigation;