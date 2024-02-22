import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { ScrollView } from 'react-native';

const Dashboard = () => {
  return (
    <View>
      <LinearGradient colors={['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.4)']} style={styles.gradient}>
        <ScrollView style = {styles.scrollview}>

          {/*This the part of Professional Talk Part */}

          <View style = {styles.professionaltalk}>
            <View style = {styles.toppart}>
              <View style = {styles.leftpartblog}>
                <Text style = {styles.professionaltalk_title}> Talk to a professional ...  </Text>
                <View style={styles.blogCard}>
                  <Image source={require('../images/login.png')} style={styles.blogimage}/>
                    <View style={styles.innerBlogCard}>
                      <View>
                        <Text style={styles.blogTitle}>Diet for a sugar patient?</Text>
                      </View>
                    </View>
                </View>
                <View style={styles.blogCard}>
                  <Image source={require('../images/login.png')} style={styles.blogimage}/>
                    <View style={styles.innerBlogCard}>
                      <View>
                        <Text style={styles.blogTitle}>What is an ideal weight loss plan?</Text>
                      </View>
                    </View>
                </View>
                <View style={styles.blogCard}>
                  <Image source={require('../images/login.png')} style={styles.blogimage}/>
                    <View style={styles.innerBlogCard}>
                      <View>
                        <Text style={styles.blogTitle}>How to deal with anxiety?</Text>
                      </View>
                    </View>
                </View>
              </View>
              <View>
                <Image source = {require('../images/login.png')}  style = {styles.rightpartimage}/>
              </View>
            </View>
          </View>

          {/*This the part of Resources Part */}

          <View style = {styles.resources}>
            <Text style = {styles.resources_title}> Resources </Text>
            <View style = {styles.resources_row}>
              <View style = {styles.resources_column}>
                <View style={styles.resCard}>
                    <View style={styles.innerresCard}>
                          <Image source={require('../images/login.png')} style={styles.resImage}/>
                    </View>
                </View>
                <Text style = {{fontStyle: 'italic',textAlign: 'center'}}>Self Help Videos</Text>
              </View>
              <View style = {styles.resources_column}>
                <View style={styles.resCard}>
                    <View style={styles.innerresCard}>
                          <Image source={require('../images/login.png')} style={styles.resImage}/>
                    </View>
                </View>
                <Text style = {{fontStyle: 'italic',textAlign: 'center'}}>Mind Notes</Text>
              </View>
              <View style = {styles.resources_column}>
                <View style={styles.resCard}>
                    <View style={styles.innerresCard}>
                          <Image source={require('../images/login.png')} style={styles.resImage}/>
                    </View>
                </View>
                <Text style = {{fontStyle: 'italic',textAlign: 'center'}}>Blogs</Text>
              </View>
            </View>
          </View>


          {/*This the part of Self Help Tools Part */}

          <View style = {styles.resources}>
            <Text style = {styles.resources_title}> Self Help Tools </Text>
            <View style = {styles.resources_row}>
              <View style = {styles.resources_column}>
                <View style={styles.resCard}>
                    <View style={styles.innerresCard}>
                          <Image source={require('../images/login.png')} style={styles.resImage}/>
                    </View>
                </View>
                <Text style = {{fontStyle: 'italic',textAlign: 'center'}}>Exercise Tutorials</Text>
              </View>
              <View style = {styles.resources_column}>
                <View style={styles.resCard}>
                    <View style={styles.innerresCard}>
                          <Image source={require('../images/login.png')} style={styles.resImage}/>
                    </View>
                </View>
                <Text style = {{fontStyle: 'italic',textAlign: 'center'}}>Diet Plans</Text>
              </View>
              <View style = {styles.resources_column}>
                <View style={styles.resCard}>
                    <View style={styles.innerresCard}>
                          <Image source={require('../images/login.png')} style={styles.resImage}/>
                    </View>
                </View>
                <Text style = {{fontStyle: 'italic',textAlign: 'center'}}>Goal Ladder</Text>
              </View>
            </View>
          </View>


          {/*This the part of Consulatation Part */}

          <View style = {styles.consulation}>
            <Text style = {styles.consulation_title}> Consult Doctors </Text>
            <View style = {styles.consulation_row}>
              <View style={styles.consulation_card}>
                  <View style={styles.consulation_inner_card_left}>
                        <Image source={require('../images/login.png')} style={styles.consulation_img}/>
                  </View>
                  <View style = {styles.consulation_inner_card_right}>
                    <Text style = {{textAlign:"center",fontSize: 20, fontWeight: 'bold'}}> Dr. Anirudh Gupta</Text>
                    <Text style = {{textAlign:"center",fontSize: 12, fontStyle: 'italic'}}> General Physician  MBBS {"\n"} 15 years exp.</Text>
                  </View>
              </View>
              <View style={styles.consulation_card}>
                  <View style={styles.consulation_inner_card_left}>
                        <Image source={require('../images/login.png')} style={styles.consulation_img}/>
                  </View>
                  <View style = {styles.consulation_inner_card_right}>
                    <Text style = {{textAlign:"center",fontSize: 20, fontWeight: 'bold'}}> Dr. Emily Watson</Text>
                    <Text style = {{textAlign:"center",fontSize: 12, fontStyle: 'italic'}}> Orthopedics {"\n"} MBBS, MD, 9 years exp.</Text>
                  </View>
              </View>
              <View style={styles.consulation_card}>
                  <View style={styles.consulation_inner_card_left}>
                        <Image source={require('../images/login.png')} style={styles.consulation_img}></Image>
                  </View>
                  <View style = {styles.consulation_inner_card_right}>
                    <Text style = {{textAlign:"center",fontSize: 20, fontWeight: 'bold'}}> Dr. Greg Morris</Text>
                    <Text style = {{textAlign:"center",fontSize: 12, fontStyle: 'italic'}}> General Physician  MBBS {"\n"} 15 years exp.</Text>
                  </View>
              </View>
            </View>
          </View>

          {/*This the part of Testimonial Part */}

          <View style = {styles.testimonial}>
            <Text style = {styles.testimonial_title}> Testimonials </Text>
            <View style={styles.testimonial_card}>
              <View style={styles.testimonial_inner_card}>
                <View style={styles.testimonial_inner_card_left}>
                      <Image source={require('../images/login.png')} style={styles.testimonial_img}/>
                </View>
                <View style = {styles.testimonial_inner_card_right}>
                  <Text style = {{textAlign:"left",fontSize: 20, fontWeight: 'bold'}}>Jay Rathod</Text>
                  <Text style = {{textAlign:'justify',fontSize: 12, fontStyle: 'italic'}}>This app helped my gain control over my chronic anxiety. Your identity is always protected which made me feel very secure.</Text>
                </View>
              </View>
              <View style={styles.testimonial_inner_card}>
                <View style={styles.testimonial_inner_card_left}>
                      <Image source={require('../images/login.png')} style={styles.testimonial_img}/>
                </View>
                <View style = {styles.testimonial_inner_card_right}>
                  <Text style = {{textAlign:"left",fontSize: 20, fontWeight: 'bold'}}>Ashu Dubey</Text>
                  <Text style = {{textAlign:'justify',fontSize: 12, fontStyle: 'italic'}}>The Q&A forum here is so helpful. Most topics are usually covered before itself. When new questions are posted the response is very quick.</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({

  gradient: {
    width: '100%',
    height: '100%',
  },


  mainTitle: {
    fontSize: 40,
    marginTop: 20,
  },


  scrollview:{
    marginLeft: 10,
    marginRight: 10,
  },


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
  },
  rightpartimage:{
    width: 145,
    height: 155
  },
  blogimage:{
    width: 20,
    height: 20,
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
  

  resources:{
    marginTop: 30,
  },
  resources_title: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign:"center",
  },
  resources_row: {
    flexDirection: 'row',
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
    justifyContent: 'center',
    alignContent: 'center',
  },
  innerresCard: {
    backgroundColor: '#FFFFFF',
    height: 85,
    width: 85,
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 3,
  },
  resImage: {
    width: 65,
    height: 65,
  },


  consulation:{
    marginTop: 30,
  },
  consulation_title:{
    fontSize: 35,
    fontWeight: 'bold',
    textAlign:"center",
  },
  consulation_row:{
    marginLeft: 40,
    marginRight: 40,
    flexDirection: 'column',
  },
  consulation_card:{
    backgroundColor: '#FFB68D',
    flexDirection: 'row',
    marginTop: 30,
    height: 75,
    marginRight:10,
    borderRadius: 40,
    marginLeft: 10,
  },
  consulation_inner_card_left:{
    backgroundColor: '#FFFFFF',
    height: 75,
    width: 75,
    borderRadius: 100,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 3,
  },
  consulation_inner_card_right:{
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  consulation_img:{
    width: 60,
    height: 60,
  },


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

export default Dashboard;