import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { useRouter } from "expo-router";

const HealthResources = () => {
  const router = useRouter();
  const navigation = useNavigation(); // Hook for accessing navigation object

  return (
        <>
          {/*This the part of Resources Part */}

          <View style = {styles.resources}>
            <Text style = {styles.resources_title}> Resources </Text>
            <View style = {styles.resources_row}>
              <View style = {styles.resources_column}>
                <View style={styles.resCard}>
                    <View style={styles.innerresCard}>
                          <Image source={require('../assets/images/Resources/image1.png')} style={styles.resImage}/>
                    </View>
                </View>
                <Text style = {{fontStyle: 'italic',textAlign: 'center'}}>Self Help Videos</Text>
              </View>
              <View style = {styles.resources_column}>
                <View style={styles.resCard}>
                    <View style={styles.innerresCard}>
                          <Image source={require('../assets/images/Resources/mindnotes.png')} style={styles.resImage}/>
                    </View>
                </View>
                <Text style = {{fontStyle: 'italic',textAlign: 'center'}}>Journal</Text>
              </View>
              <View style = {styles.resources_column}>
              <TouchableOpacity onPress={()=>{router.push("blog")}}>
                  <View style={styles.resCard}>
                    <View style={styles.innerresCard}>
                      <Image source={require('../assets/images/Resources/blog.png')} style={styles.resImage} />
                    </View>
                  </View>
                  <Text style={{ fontStyle: 'italic', textAlign: 'center' }}>Blogs</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
  );
};

const styles = StyleSheet.create({

  
  resources:{
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  resources_title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign:"center",
  },
  resources_row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  resources_column:{
    flexDirection: 'column',
  },
  resCard: {
    backgroundColor: '#FFB68D',
    marginTop: 30,
    height: 94,
    flexDirection: 'column',
    width: 94,
    borderRadius: 100,
    marginLeft: 10,
    marginRight: 10,
    padding: 3,
    marginBottom: 10,
    alignItems: 'center',
  },
  innerresCard: {
    backgroundColor: '#FFFFFF',
    height: 85,
    width: 85,
    borderRadius: 100,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resImage: {
    borderRadius: 50,
    width: 75,
    height: 75,
  },

});

export default HealthResources;