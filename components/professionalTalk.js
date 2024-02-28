import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfessionalTalk = () => {

  return (
    <>
      {/*This is the part of Professional Talk Part */}
      <View style={styles.professionaltalk}>
        <Text style={styles.professionaltalk_title}>Talk to a professional ...</Text>
        <View style={styles.toppart}>
          <View style={styles.leftpartblog}>
            <View style={styles.blogCard}>
              <Image source={require('../assets/images/ProfessionalTalk/profile1.png')} style={styles.blogimage} />
              <View style={styles.innerBlogCard}>
                <Text style={styles.blogTitle}>Diet for a sugar patient?</Text>
              </View>
            </View>
            <View style={styles.blogCard}>
              <Image source={require('../assets/images/ProfessionalTalk/profile2.png')} style={styles.blogimage} />
              <View style={styles.innerBlogCard}>
                <Text style={styles.blogTitle}>What is an ideal weight loss plan?</Text>
              </View>
            </View>
            <View style={styles.blogCard}>
              <Image source={require('../assets/images/ProfessionalTalk/profile3.png')} style={styles.blogimage} />
              <View style={styles.innerBlogCard}>
                <Text style={styles.blogTitle}>How to deal with anxiety?</Text>
              </View>
            </View>
          </View>
          <Image source={require('../assets/images/ProfessionalTalk/forums1.png')} style={styles.rightpartimage} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

  professionaltalk: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  professionaltalk_title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  toppart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  leftpartblog: {
    flex: 1,
  },
  rightpartimage: {
    width: '30%',
    height: 'auto'
  },
  blogimage: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  innerBlogCard: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 5,
    width: '80%'
  },
  blogCard: {
    backgroundColor: '#FFB68D',
    flexDirection: 'row',
    borderRadius: 35,
    padding: 5,
    marginBottom: 10,
    width: '95%'
  },
  blogTitle: {
    fontSize: 12,
    textAlign: 'center'
  },

});

export default ProfessionalTalk;
