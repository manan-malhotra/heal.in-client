import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
                      <Text style = {{textAlign:'center',fontWeight:'bold',color:"white",textAlign: 'center',fontSize: 14}}>DEPRESSION{"\n"}TEST</Text>
                      <Text style = {{textAlign:'center',fontWeight:'bold',color:"white",textAlign: 'center',fontSize: 25}}>+</Text>
                    </View>
                </View>
              </View>
              <View style = {styles.sat_column}>
                <View style={styles.satCard}>
                    <View style={styles.innersatCard}>
                      <Text style = {{textAlign:'center',fontWeight:'bold',color:'white',textAlign: 'center',fontSize: 15}}>ANXIETY{"\n"}TEST</Text>
                      <Text style = {{textAlign:'center',fontWeight:'bold',color:'white',textAlign: 'center',fontSize: 25}}>+</Text>
                    </View>
                </View>
              </View>
              <View style = {styles.sat_column}>
                <View style={styles.satCard}>
                    <View style={styles.innersatCard}>
                          <Text style = {{textAlign:'center',fontWeight:'bold',color:'white',textAlign: 'center',fontSize: 15}}>ADHD{'\n'}TEST</Text>
                          <Text style = {{textAlign:'center',fontWeight:'bold',color:'white',textAlign: 'center',fontSize: 25}}>+</Text>
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
      marginTop: 20,
      marginLeft: 10,
      marginRight: 10
      },
      sat_title: {
        fontSize: 35,
        fontWeight: 'bold',
        textAlign:"center",
      },
      sat_row: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
      },
      sat_column:{
        flexDirection: 'column',
      },
      satCard: {
        backgroundColor: 'rgba(87, 152, 250, 0.8)',
        marginTop: 30,
        flexDirection: 'column',
        borderRadius: 10,
        height: 100,
        width: 100,
        padding: 3,
      },
      innersatCard: {
        borderRadius: 10,
        padding: 3,
        flex:1,
        justifyContent: 'center', 
        alignItems: 'center'
      },
      satImage: {
        width: 65,
        height: 65,
      },

});

export default SelfAssessmentTools;