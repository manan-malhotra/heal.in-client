import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Provider as PaperProvider } from 'react-native-paper';
import Users from '../assets/images/user.png';
import { Image, StyleSheet } from 'react-native';
import DashboardIcon from '../assets/images/dashboard.png';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Profile from './Profile';
import AdminDashboard from './adminDashboard';

const Tab = createBottomTabNavigator();

const AdminDashboardNavigation = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'addUsers', title: 'Admin Dashboard', icon: DashboardIcon },
    { key: 'profile', title: 'Profile', icon: Users },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    addUsers: AdminDashboard,
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
        barStyle={{ backgroundColor: '#3340B0', height: heightPercentageToDP(13) }} 
        activeColor="white" 
        inactiveColor="grey" 
        shifting={false}
        renderIcon={({ route, focused, color }) => (
          <Image
            source={route.icon}
            style={{height:heightPercentageToDP(4),width:widthPercentageToDP(8), tintColor: focused ? color : 'grey' }}
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