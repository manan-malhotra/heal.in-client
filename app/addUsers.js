import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';


const AddUsers = () => {
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [selectedUserRole, setSelectedUserRole] = useState('');


  const handleAddUser = () => {
    // Logic to add a new user
    console.log('Add user:', newUserName, newUserRole);
    // Clear input fields
    setNewUserName('');
    setNewUserRole('');
    // Hide the modal
    setIsAddUserModalVisible(false);
  };

  // Function to render the form based on the selected user role
  const renderUserForm = () => {
    switch (selectedUserRole) {
      case 'user':
        return (
          <View style={styles.formContainer}>
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
              placeholder="Email Id"
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
              placeholder="Contact No"
            />
          </View>
        );
      case 'doctor':
        return (
          <View style={styles.formContainer}>
            {/* Doctor form fields */}
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
              placeholder="Email Id"
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
              placeholder="Contact No"
            />
            <TextInput
              style={styles.input}
              placeholder="Degree"
            />
            <TextInput
              style={styles.input}
              placeholder="Experience"
            />
            <TextInput
              style={styles.input}
              placeholder="License Number"
            />
            <TextInput
              style={styles.input}
              placeholder="Specialization"
            />
            <TextInput
              style={styles.input}
              placeholder="User ID"
            />
          </View>
        )
      case 'responder':
        return (
          <View style={styles.formContainer}>
            {/* Responder form fields */}
            <TextInput
              style={styles.input}
              placeholder="First Name"
            />
            {/* Add other fields as needed */}
          </View>
        );
      case 'moderator':
        return (
          <View style={styles.formContainer}>
            {/* Moderator form fields */}
            <TextInput
              style={styles.input}
              placeholder="First Name"
            />
            {/* Add other fields as needed */}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>User Management</Text>
      <Text style={styles.text}>Select Role</Text>

      {/* Options for selecting user role */}
      <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              selectedUserRole === 'user' && styles.selectedOption,
            ]}
            onPress={() => setSelectedUserRole('user')}
          >
            <Text style={styles.optionText}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.option,
              selectedUserRole === 'doctor' && styles.selectedOption,
            ]}
            onPress={() => setSelectedUserRole('doctor')}
          >
            <Text style={styles.optionText}>Doctor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.option,
              selectedUserRole === 'responder' && styles.selectedOption,
            ]}
            onPress={() => setSelectedUserRole('responder')}
          >
            <Text style={styles.optionText}>Responder</Text>
          </TouchableOpacity>
        </View>
      {/* Render the user form */}
      <ScrollView style = {styles.scrollView}>
        {renderUserForm()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  lg_container: {
    width: '100%',
    height: '100%',
  },
  scrollView: {
    height: heightPercentageToDP(33),
  },
  container: {
    borderRadius: heightPercentageToDP(5),
    backgroundColor: 'white',
    opacity: 0.8,
    marginLeft: widthPercentageToDP(5),
    marginRight: widthPercentageToDP(5),
    padding: heightPercentageToDP(3)
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: widthPercentageToDP(5),
    textAlign: 'center',
  },
  text: {
    fontSize : 15,
    fontWeight: 'bold',
    marginBottom: heightPercentageToDP(2),
    alignSelf: 'center'
  },
  optionText: {
    fontSize: 11,
    padding: 10
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP(2)
  },
  option: {
    width: widthPercentageToDP(22),
    height: heightPercentageToDP(4.5),
    backgroundColor: 'rgba(0,0,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  selectedOption: {
    backgroundColor: 'rgba(0,0,255,0.55)',
  },
  formContainer: {
    marginTop: heightPercentageToDP(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: widthPercentageToDP(67),
    height: heightPercentageToDP(5),
    borderWidth: 0.3,
    borderRadius: 5,
    marginBottom: heightPercentageToDP(1),
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'rgba(50,100,255,0.26)',
    alignSelf: 'center',
    borderRadius: 10,
    padding: widthPercentageToDP(2),
  },
  buttonText: {
    color: "rgba(0,0,0,0.6)",
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: widthPercentageToDP(5),
    borderRadius: 10,
    width: '80%',
  },
});

export default AddUsers;
