import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Modal, TextInput, Image } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/AntDesign";
import { Picker } from '@react-native-picker/picker'; // Import Picker component

const AddUsers = () => {
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [selectedUserType, setSelectedUserType] = useState('user');

  const gradientColors = ['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.4)'];

  const handleAddUser = () => {
    // Logic to add a new user
    console.log('Add user:', newUserName, newUserRole);
    // Clear input fields
    setNewUserName('');
    setNewUserRole('');
    // Hide the modal
    setIsAddUserModalVisible(false);
  };

  // Function to render the form based on the selected user type
  const renderUserForm = () => {
    switch (selectedUserType) {
      case 'user':
        return (
          <View>
            {/* User form fields */}
            <TextInput
              style={styles.input}
              placeholder="First Name"
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
            />
            <TextInput
              style={styles.input}
              placeholder="Email ID"
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
            />
          </View>
        );
      case 'doctor':
        return (
          <View>
            {/* Doctor form fields */}
            <TextInput
              style={styles.input}
              placeholder="First Name"
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
            /><TextInput
              style={styles.input}
              placeholder="Email ID"
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
            /><TextInput
              style={styles.input}
              placeholder="Gender"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
            />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
            />
            <TextInput
              style={styles.input}
              placeholder="Degree"
            /><TextInput
              style={styles.input}
              placeholder="Experience"
            /><TextInput
              style={styles.input}
              placeholder="License Number"
            /><TextInput
              style={styles.input}
              placeholder="Specialization"
            /><TextInput
              style={styles.input}
              placeholder="User ID"
            />

          </View>
        );
      case 'responder':
        return (
          <View>
            {/* Responder form fields */}
            <TextInput
              style={styles.input}
              placeholder="Responder Field 1"
            />
            <TextInput
              style={styles.input}
              placeholder="Responder Field 2"
            />
          </View>
        );
      case 'moderator':
        return (
          <View>
            {/* Moderator form fields */}
            <TextInput
              style={styles.input}
              placeholder="Moderator Field 1"
            />
            <TextInput
              style={styles.input}
              placeholder="Moderator Field 2"
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient colors={gradientColors} style={styles.gradient}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.heading}>User Management</Text>
          {/* Dropdown to select user type */}
          <View style={styles.dropdown}>
            <Text>Select User Type: </Text>
            <Picker
              selectedValue={selectedUserType}
              style={{ width: widthPercentageToDP(40)}}
              onValueChange={(itemValue) => setSelectedUserType(itemValue)}
            >
              <Picker.Item label="User" value="user" />
              <Picker.Item label="Doctor" value="doctor" />
              <Picker.Item label="Responder" value="responder" />
              <Picker.Item label="Moderator" value="moderator" />
            </Picker>
          </View>
          {/* Add User Button */}
          <TouchableOpacity
            onPress={() => setIsAddUserModalVisible(true)}
          >
          </TouchableOpacity>
          {/* Render the user form */}
          {renderUserForm()}
          {/* Add User Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isAddUserModalVisible}
            onRequestClose={() => setIsAddUserModalVisible(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter User Name"
                  value={newUserName}
                  onChangeText={setNewUserName}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Enter User Role"
                  value={newUserRole}
                  onChangeText={setNewUserRole}
                />
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={handleAddUser}
                >
                  <Text style={styles.buttonText}>Add User</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
  },
  container: {
    flex: 1,
    padding: widthPercentageToDP(5),
    marginTop: heightPercentageToDP(2),
    justifyContent: 'center'
  },
  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: widthPercentageToDP(1),
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  addButton: {
    backgroundColor: 'rgba(50,100,255,0.26)',
    alignSelf: 'center',
    marginBottom: heightPercentageToDP(3),
    borderRadius: 10,
    padding: widthPercentageToDP(2),
  },
  buttonText: {
    color: "rgba(0,0,0,0.6)",
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: widthPercentageToDP(4),
    backgroundColor: 'transparent',
    borderWidth: 0.3,
    borderRadius: 20,
    marginBottom: heightPercentageToDP(2),
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 16,
    color: '#777',
  },
  actions: {
    flexDirection: 'row',
  },
  editBtn: {
    justifyContent: 'center',
    marginRight: widthPercentageToDP(8),
  },
  deleteBtn: {
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: heightPercentageToDP(4),
    paddingLeft: widthPercentageToDP(5),
    paddingRight: widthPercentageToDP(5),
    borderRadius: 10,
    width: '80%',
  },
  input: {
    height: heightPercentageToDP(6),
    borderWidth: 0.3,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default AddUsers;

