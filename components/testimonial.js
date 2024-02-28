import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Testimonial = () => {

  return (
        <>
          {/*This the part of Testimonial Part */}

          <View style = {styles.testimonial}>
            <Text style = {styles.testimonial_title}> Testimonials </Text>
            <View style={styles.testimonial_card}>
              <View style={styles.testimonial_inner_card}>
                <View style={styles.testimonial_inner_card_left}>
                      <Image source={require('../assets/images/ProfessionalTalk/profile1.png')} style={styles.testimonial_img}/>
                </View>
                <View style = {styles.testimonial_inner_card_right}>
                  <Text style = {{textAlign:"left",fontSize: 20, fontWeight: 'bold'}}>Jay Rathod</Text>
                  <Text style = {{textAlign:'justify',fontSize: 12, fontStyle: 'italic'}}>This app helped my gain control over my chronic anxiety. Your identity is always protected which made me feel very secure.</Text>
                </View>
              </View>
              <View style={styles.testimonial_inner_card}>
                <View style={styles.testimonial_inner_card_left}>
                      <Image source={require('../assets/images/ProfessionalTalk/profile3.png')} style={styles.testimonial_img}/>
                </View>
                <View style = {styles.testimonial_inner_card_right}>
                  <Text style = {{textAlign:"left",fontSize: 20, fontWeight: 'bold'}}>Ashu Dubey</Text>
                  <Text style = {{textAlign:'justify',fontSize: 12, fontStyle: 'italic'}}>The Q&A forum here is so helpful. Most topics are usually covered before itself. When new questions are posted the response is very quick.</Text>
                </View>
              </View>
            </View>
          </View>
        </>
  );
};

const styles = StyleSheet.create({

    testimonial: {
        marginTop: 30,
      },
      testimonial_title:{
        fontSize: 35,
        fontWeight: 'bold',
        textAlign:"center",
      },
      testimonial_card:{
        flexDirection: 'column',
        backgroundColor: '#FFB68D',
        marginTop: 30,
        marginBottom: 30,
        height: 'auto',
        marginRight:10,
        borderRadius: 20,
        marginLeft: 10,
      },
      testimonial_inner_card:{
        justifyContent: 'left',
        flexDirection: 'row',
        marginRight: 60,
        marginTop: 5,
        marginBottom: 15,
      },
      testimonial_inner_card_left:{
        marginLeft:20,
        marginRight: 5,
      },
      testimonial_inner_card_right:{
        flexDirection: 'column',
        marginTop: 10,
        justifyContent: 'space-evenly',
      },
      testimonial_img: {
        marginTop: 10,
        height: 25,
        width: 25,
        borderRadius: 24,
      }
  
});

export default Testimonial;