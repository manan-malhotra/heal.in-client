import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

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
                  <Text style = {{textAlign:'justify',fontSize: 12, fontStyle: 'italic'}}>The Q&A  here is so helpful. Most topics are usually covered before itself. When new questions are posted the response is very quick.</Text>
                </View>
              </View>
            </View>
          </View>
        </>
  );
};

const styles = StyleSheet.create({

    testimonial: {
        marginTop: heightPercentageToDP(3),
      },
      testimonial_title:{
        fontSize: 35,
        fontWeight: 'bold',
        textAlign:"center",
      },
      testimonial_card:{
        flexDirection: 'column',
        backgroundColor: '#FFB68D',
        marginTop: heightPercentageToDP(3),
        marginBottom: heightPercentageToDP(3),
        borderRadius: 20,
      },
      testimonial_inner_card:{
        flexDirection: 'row',
        width: widthPercentageToDP(78),
        marginTop: heightPercentageToDP(1),
        marginBottom: heightPercentageToDP(1),
      },
      testimonial_inner_card_left:{
        marginLeft:widthPercentageToDP(4),
        marginRight:widthPercentageToDP(2),
      },
      testimonial_inner_card_right:{
        flexDirection: 'column',
        marginTop: heightPercentageToDP(1),
        justifyContent: 'space-evenly',
      },
      testimonial_img: {
        marginTop: heightPercentageToDP(1.2),
        height: heightPercentageToDP(3),
        width: widthPercentageToDP(7),
        borderRadius: 24,
      }
  
});

export default Testimonial;