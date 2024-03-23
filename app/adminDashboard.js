import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, Provider as PaperProvider } from 'react-native-paper';
import Users from '../assets/images/user.png';
import Tests from '../assets/images/tests.png';
import Resources from '../assets/images/resources.png';
import { Image, StyleSheet } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AddResources from './addResources';
import AddTests from './addTests';
import AddUsers from './addUsers';

const Tab = createBottomTabNavigator();

const AdminDashboard = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'addUsers', title: 'Add Users', icon: Users },
    { key: 'addTests', title: 'Add Tests', icon: Tests },
    { key: 'addResources', title: 'Add Resources', icon: Resources },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    addUsers: AddUsers,
    addTests: AddTests,
    addResources: AddResources,
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

export default AdminDashboard;