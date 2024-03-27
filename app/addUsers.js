import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

const AddUsers = () => {
  const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
  const [selectedUserRole, setSelectedUserRole] = useState('');
  
  const [formData, setFormData] = useState({
    role: '',
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    gender: '',
    password: '',
    contactNo: '',
    degree: '',
    specialization: '',
    experience: '',
    licenseNumber: ''
  });

  const handleInputChange = (name, text) => {
    setFormData({ ...formData, [name]: text });
  };

  const handleSubmit = () => {
    console.log("Form Data: ", formData);
    handleSave(formData.role);
    setIsAddUserModalVisible(false);
  };

  const handleSave = async (role) => {
    if(role == "DOCTOR") {
      try {
        const response = await axios.post(
            process.env.API_HOST + "/doctors/addDoctor",
            {
              "firstName": formData.firstName,
              "lastName": formData.lastName,
              "email": formData.email,
              "age": parseInt(formData.age),
              "gender": formData.gender,
              "password": formData.password,
              "role":role,
              "contact": formData.contactNo,
              "degree": formData.degree,
              "experience": formData.experience,
              "license_number": formData.licenseNumber,
              "specialization": formData.specialization
            }
        );
        if (response.status === 200) {
          console.log("SUCCESS");
          setFormData({
            role: '',
            firstName: '',
            lastName: '',
            email: '',
            age: '',
            gender: '',
            password: '',
            contactNo: '',
            degree: '',
            specialization: '',
            experience: '',
            licenseNumber: ''
          });
        }
      } catch (error) {
        
          console.log("Error saving post: " + error);
          console.log(error.data.message);
      }
    } else {
      try {
        const response = await axios.post(
            process.env.API_HOST + "/api/user/register",
            {
              "firstName": formData.firstName,
              "lastName": formData.lastName,
              "email": formData.email,
              "age": parseInt(formData.age),
              "gender": formData.gender,
              "password": formData.password,
              "role":role,
              "contact": formData.contactNo
            }
        );
        if (response.status === 200) {
          console.log("SUCCESS");
          setFormData({
            role: '',
            firstName: '',
            lastName: '',
            email: '',
            age: '',
            gender: '',
            password: '',
            contactNo: '',
            degree: '',
            specialization: '',
            experience: '',
            licenseNumber: ''
          })
        }
      } catch (error) {
        
          console.log("Error saving post: " + error);
          console.log(error.data.message);
      }
    }
  };

  const renderUserForm = () => {
    switch (selectedUserRole) {
      case 'user':
        return (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Id"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              onChangeText={(text) => handleInputChange('age', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={formData.gender}
              onChangeText={(text) => handleInputChange('gender', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact No"
              value={formData.contactNo}
              onChangeText={(text) => handleInputChange('contactNo', text)}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.addButton} onPress={()=>{
              formData.role="USER",
              handleSubmit();
            }}>
              <Text style={styles.buttonText}>Add User</Text>
            </TouchableOpacity>
          </View>
        );
      case 'doctor':
        return (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Id"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              onChangeText={(text) => handleInputChange('age', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={formData.gender}
              onChangeText={(text) => handleInputChange('gender', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact No"
              value={formData.contactNo}
              onChangeText={(text) => handleInputChange('contactNo', text)}
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Degree"
              value={formData.degree}
              onChangeText={(text) => handleInputChange('degree', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Experience"
              value={formData.experience}
              onChangeText={(text) => handleInputChange('experience', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="License Number"
              value={formData.licenseNumber}
              onChangeText={(text) => handleInputChange('licenseNumber', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Specialization"
              value={formData.specialization}
              onChangeText={(text) => handleInputChange('specialization', text)}
            />
            <TouchableOpacity style={styles.addButton} onPress={()=>{
              formData.role="DOCTOR"
              handleSubmit();
            }}>
              <Text style={styles.buttonText}>Add Doctor</Text>
            </TouchableOpacity>
          </View>
        )
      case 'responder':
        return (
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => handleInputChange('firstName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => handleInputChange('lastName', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Email Id"
              value={formData.email}
              onChangeText={(text) => handleInputChange('email', text)}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              onChangeText={(text) => handleInputChange('age', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Gender"
              value={formData.gender}
              onChangeText={(text) => handleInputChange('gender', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={formData.password}
              onChangeText={(text) => handleInputChange('password', text)}
              secureTextEntry={true}
            />
            <TextInput
              style={styles.input}
              placeholder="Contact No"
              value={formData.contactNo}
              onChangeText={(text) => handleInputChange('contactNo', text)}
              keyboardType="phone-pad"
            />
            <TouchableOpacity style={styles.addButton} onPress={()=>{
              formData.role="RESPONDER",
              handleSubmit();
            }}>
              <Text style={styles.buttonText}>Add Responder</Text>
            </TouchableOpacity>
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
    fontSize: 12,
    padding: 10
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: heightPercentageToDP(2)
  },
  option: {
    flex: 1,
    height: heightPercentageToDP(4.5),
    backgroundColor: 'rgba(0,0,255,0.3)',
    alignItems: 'center',
    marginLeft: widthPercentageToDP(1),
    marginRight: widthPercentageToDP(1),
    justifyContent: 'center',
    borderRadius: 15,
  },
  selectedOption: {
    backgroundColor: 'rgba(0,0,255,0.55)',
  },
  formContainer: {
    marginTop: heightPercentageToDP(1),
    justifyContent: 'center',
  },
  input: {
    height: heightPercentageToDP(5),
    borderWidth: 0.3,
    borderRadius: 5,
    marginBottom: heightPercentageToDP(1),
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'rgba(0,0,255,0.3)',
    alignSelf: 'center',
    borderRadius: 10,
    padding: widthPercentageToDP(1.5),
    marginBottom: heightPercentageToDP(1)
  },
  buttonText: {
    color: "rgba(0,0,0,0.6)",
    fontSize: 14,
    fontWeight: '500'
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
