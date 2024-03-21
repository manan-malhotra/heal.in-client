import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/authcontext";

const Profile = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    logout();
  }
  return (
    <LinearGradient
      colors={[
        "rgba(255,255,255,0.2)",
        "rgba(110,113,254,0.6)",
        "rgba(4,0,207,0.4)",
      ]}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.username}>My Profile</Text>
        <View >
          <View style = {styles.card}>
            <View style = {styles.userData}>
              <View style = {styles.innercard}>
                <View style = {styles.leftinnercardpart}>
                  <Image style={styles.icon} source={require('../assets/images/name.png')}/>
                  <Text style={{paddingLeft:'2%',fontSize: 14,alignSelf:'center',color:'grey',fontWeight:'bold'}}>Username</Text>
                </View>
                <Text style={styles.info}>Manan Malhotra</Text>
              </View>
              <View style = {styles.innercard}>
                <View style = {styles.leftinnercardpart}>
                  <Image style={styles.icon} source={require('../assets/images/mail.png')}/>
                  <Text style={{paddingLeft:'2%',fontSize: 14,alignSelf:'center',color:'grey',fontWeight:'bold'}}>E-Mail</Text>
                </View>
                <Text style={styles.info}>manan@gmail.com</Text>
              </View>
              <View style = {styles.innercard}>
                <View style = {styles.leftinnercardpart}>
                  <Image style={styles.icon} source={require('../assets/images/contact_number.png')}/>
                  <Text style={{paddingLeft:'2%',fontSize: 14,alignSelf:'center',color:'grey',fontWeight:'bold'}}>Phone No.</Text>
                </View>
                <Text style={styles.info}>+91 - 1231264211</Text>
              </View>
              <View style = {styles.innercard}>
                  <View style = {styles.leftinnercardpart}>
                    <Image style={styles.icon} source={require('../assets/images/age.png')}/>
                    <Text style={{paddingLeft:'2%',fontSize: 14,alignSelf:'center',color:'grey',fontWeight:'bold'}}>Age</Text>
                  </View>
                  <Text style={styles.info}>24 yr</Text>
              </View>
              <View style = {styles.innercard}>
                  <View style = {styles.leftinnercardpart}>
                    <Image style={styles.icon} source={require('../assets/images/gender.png')}/>
                    <Text style={{paddingLeft:'2%',fontSize: 14,alignSelf:'center',color:'grey',fontWeight:'bold'}}>Gender</Text>
                  </View>
                  <Text style={styles.info}>Male</Text>
              </View>
            </View>
          </View> 
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.buttonText} >Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '3%',
    paddingLeft: '2%',
    paddingRight: '2%',
    justifyContent: 'center'
  },
  leftinnercardpart: {
    flexDirection: "row",
  },
  card: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 10,
    marginBottom: '5%',
  },
  icon: {
    alignSelf: 'center',
    width: 15, 
    height: 15,
    justifyContent:'flex-end'
  },
  innercard: {
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.28)',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: '2%',
    paddingRight: '2%',
    paddingTop: '3%',
    paddingBottom: '3%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '5%'
  },
  verticalLine: {
    width: '100',
    height: '1%', // Adjust the height of the line as needed
    backgroundColor: 'rgba(120, 100, 255, 0.45)', // Change the color of the line as needed
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: '3%'
  }, 
  icon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
  userData: {
    paddingTop: '2%',
    paddingBottom: '2%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  username: {
    alignSelf : 'center',
    fontSize: 32,
    marginBottom: '10%',
    fontWeight: 'bold'
  },  
  logoutButton: {
    backgroundColor: '#1877F2',
    paddingVertical: '3%',
    borderRadius: 20,
    alignSelf: 'center',
    width: '30%',
  },
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
    alignContents: 'center',
    color: 'gray',
  },
  avatar: {
    height: '20%',
    width: '35%',
    alignSelf: 'center',
    borderRadius: 90,
    marginBottom: '2%'
  },
  rowcard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default Profile;
