import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SelfAssessmentTools = () => {

  return (
        <>
          {/*This the part of Self Help Tools Part */}

          <View style = {styles.sat}>
            <Text style = {styles.sat_title}> Self Assessment Tools </Text>
            <View style = {styles.sat_row}>
              <View style = {styles.sat_column}>
                <View style={styles.satCard}>
                    <View style={styles.innersatCard}>
                      <Text style = {{fontWeight:'bold',color:"white",textAlign: 'center',fontSize: 16}}>DEPRESSION TEST</Text>
                      <Text style = {{fontWeight:'bold',color:"white",textAlign: 'center',fontSize: 30}}>+</Text>
                    </View>
                </View>
              </View>
              <View style = {styles.sat_column}>
                <View style={styles.satCard}>
                    <View style={styles.innersatCard}>
                      <Text style = {{fontWeight:'bold',color:'white',textAlign: 'center',fontSize: 16}}>ANXIETY TEST</Text>
                      <Text style = {{fontWeight:'bold',color:'white',textAlign: 'center',fontSize: 30}}>+</Text>
                    </View>
                </View>
              </View>
              <View style = {styles.sat_column}>
                <View style={styles.satCard}>
                    <View style={styles.innersatCard}>
                          <Text style = {{fontWeight:'bold',color:'white',textAlign: 'center',fontSize: 16}}>ADHD{'\n'}TEST</Text>
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
        justifyContent: 'space-between'
      },
      sat_column:{
        flexDirection: 'column'
      },
      satCard: {
        backgroundColor: 'rgba(87, 152, 236, 0.7)',
        marginTop: 30,
        height: '10%',
        flexDirection: 'column',
        width: '80%',
        borderRadius: 10,
        marginLeft: '7.5%',
        marginRight: '2%',
        padding: 3,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
      },
      innersatCard: {
        height: 85,
        width: 85,
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