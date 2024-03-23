import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { useRouter } from "expo-router";
const SelfAssessmentTools = () => {
  const router = useRouter();
  const navigation = useNavigation();
  return (
        <>
          {/*This the part of Self Help Tools Part */}

          <View style = {styles.sat}>
            <Text style = {styles.sat_title}> Self Assessment Tools </Text>
            <View style = {styles.sat_row}>
              <View style = {styles.sat_column}>
                <View style={styles.satCard}>
                    <View style={styles.innersatCard}>
                    <TouchableOpacity
                        onPress={() => {
                            router.push("depression");
                          }}
                        >
                          <Text style = {{fontWeight:'bold',color:"white",textAlign: 'center',fontSize: 14}}>DEPRESSION{'\n'}TEST</Text>
                          <Text style = {{fontWeight:'bold',color:"white",textAlign: 'center',fontSize: 30}}>+</Text>
                    </TouchableOpacity>
                    </View>
                </View>
              </View>
              <View style = {styles.sat_column}>
                <View style={styles.satCard}>
                    <View style={styles.innersatCard}>
                      <Text style = {{fontWeight:'bold',color:'white',textAlign: 'center',fontSize: 14}}>ANXIETY{'\n'}TEST</Text>
                      <Text style = {{fontWeight:'bold',color:'white',textAlign: 'center',fontSize: 30}}>+</Text>
                    </View>
                </View>
              </View>
              <View style = {styles.sat_column}>
                <View style={styles.satCard}>
                    <View style={styles.innersatCard}>
                          <Text style = {{fontWeight:'bold',color:'white',textAlign: 'center',fontSize: 14}}>ADHD{'\n'}TEST</Text>
                          <Text style = {{fontWeight:'bold',color:'white',textAlign: 'center',fontSize: 30}}>+</Text>
                    </View>
                </View>
              </View>
            </View>
          </View>
        </>
  );
};

const styles = StyleSheet.create({

  
    sat:{
        marginTop: 30,
      },
      sat_title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign:"center",
      },
      sat_row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginRight: '2%',
        marginLeft: '2%',
      },
      sat_column:{
        flexDirection: 'column',
      },
      satCard: {
        backgroundColor: 'rgba(87, 152, 236, 0.7)',
        marginTop: 30,
        height: 130,
        flexDirection: 'column',
        width: 105,
        borderRadius: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      innersatCard: {
        height: 85,
        width: '90%',
        borderRadius: 10,
        justifyContent: 'center',
        padding: 3,
      },
      satImage: {
        width: 65,
        height: 65,
      },

});

export default SelfAssessmentTools;