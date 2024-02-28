import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfessionalTalk = () => {

  return (
        <>
          {/*This the part of Professional Talk Part */}
          <View style = {styles.professionaltalk}>
            <View style = {styles.toppart}>
              <View style = {styles.leftpartblog}>
                <Text style = {styles.professionaltalk_title}> Talk to a professional ...  </Text>
                <View style={styles.blogCard}>
                  <Image source={require('../assets/images/ProfessionalTalk/profile1.png')} style={styles.blogimage}/>
                    <View style={styles.innerBlogCard}>
                      <View>
                        <Text style={styles.blogTitle}>Diet for a sugar patient?</Text>
                      </View>
                    </View>
                </View>
                <View style={styles.blogCard}>
                  <Image source={require('../assets/images/ProfessionalTalk/profile2.png')} style={styles.blogimage}/>
                    <View style={styles.innerBlogCard}>
                      <View>
                        <Text style={styles.blogTitle}>What is an ideal weight loss plan?</Text>
                      </View>
                    </View>
                </View>
                <View style={styles.blogCard}>
                  <Image source={require('../assets/images/ProfessionalTalk/profile3.png')} style={styles.blogimage}/>
                    <View style={styles.innerBlogCard}>
                      <View>
                        <Text style={styles.blogTitle}>How to deal with anxiety?</Text>
                      </View>
                    </View>
                </View>
              </View>
              <View>
                <Image source = {require('../assets/images/ProfessionalTalk/forums1.png')}  style = {styles.rightpartimage}/>
              </View>
            </View>
          </View>
        </>
  );
};

const styles = StyleSheet.create({

  professionaltalk:{
    marginTop: 10,
  },
  professionaltalk_title:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  toppart:{
    textAlign:"left",
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 30
  },
  leftpartblog:{
    marginRight: 2,
  },
  rightpartimage:{
    width: 145,
    height: 170
  },
  blogimage:{
    width: 15,
    height: 15,
  },
  innerBlogCard:{
    marginLeft: 7,
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 5,
    width: 145
  },
  blogCard: {
    justifyContent: 'space-evenly',
    backgroundColor: '#FFB68D',
    flexDirection: 'row',
    borderRadius: 25,
    padding: 5,
    marginBottom: 10,
  },
  blogTitle: {
    fontSize: 10,
    textAlign: 'center'
  },
  
});

export default ProfessionalTalk;