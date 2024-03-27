import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import AddUsers from './addUsers'; // Import AddUsers component
import AddTests from './addTests'; // Import AddTests component
import AddResources from './addResources'; // Import AddResources component
import Icon from 'react-native-vector-icons/FontAwesome'

const AdminDashboard = () => {
  const [selectedPage, setSelectedPage] = useState('AddUsers');

  const gradientColors = ['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.4)'];

  const renderPage = () => {
    switch (selectedPage) {
      case 'AddUsers':
        return <AddUsers />;
      case 'AddTests':
        return <AddTests />;
      case 'AddResources':
        return <AddResources />;
      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.lg_container}>
      <View style={styles.container}>
        <Text style={styles.heading}>Admin Dashboard</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedPage === 'AddUsers' && styles.selectedTab]}
            onPress={() => setSelectedPage('AddUsers')}
          >
            <View style={styles.tabContainerRow}>
              <Icon name="user" size={18} color="white" />
              <Text style={styles.tabText}>Add Users</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedPage === 'AddTests' && styles.selectedTab]}
            onPress={() => setSelectedPage('AddTests')}
          >
            <View style={styles.tabContainerRow}>
              <Icon name="flask" size={18} color="white" />
              <Text style={styles.tabText}>Add Tests</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedPage === 'AddResources' && styles.selectedTab]}
            onPress={() => setSelectedPage('AddResources')}
          >
            <View style={styles.tabContainerRow}>
              <Icon name="file-text" size={18} color="white" />
              <Text style={styles.tabText}>Add Resources</Text>
            </View>
          </TouchableOpacity>
        </View>
        {/* Render the selected page */}
          <View style = {styles.pageContainer}>
            {renderPage()}
          </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  lg_container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginVertical: heightPercentageToDP(5),
    marginHorizontal: widthPercentageToDP(5),
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: heightPercentageToDP(3),
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tabContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    height: heightPercentageToDP(4),
    backgroundColor: 'rgba(0,0,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: widthPercentageToDP(1),
    marginRight: widthPercentageToDP(1),
    flexDirection: 'row', // Added
  },
  selectedTab: {
    backgroundColor: 'rgba(0,0,255,0.5)',
  },
  tabText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: widthPercentageToDP(1), // Added margin to separate text from icon
  },
  pageContainer: {
    flex: 1,
    marginTop: heightPercentageToDP(6),
  },
});

export default AdminDashboard;
