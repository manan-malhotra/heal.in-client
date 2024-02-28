import React  from 'react';
import { View, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { ScrollView } from 'react-native';

import ProfessionalTalk from '../components/professionalTalk';
import HealthResources from '../components/healthResources';
import SelfAssessmentTools from '../components/selfAssessmentTools';
import ConsultDoctors from '../components/consultDoctors';
import Testimonial from '../components/testimonial';

const Dashboard = () => {
  const gradientColors = ['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.4)'];
  return (
    <View>
      <LinearGradient colors={gradientColors}  style={styles.gradient}>
        <ScrollView style = {styles.scrollview}>

          {/*This the part of Professional Talk Part */}
          <ProfessionalTalk/>

          {/*This the part of Resources Part */}
          <HealthResources/>

          {/*This the part of Self Help Tools Part */}
          <SelfAssessmentTools/>

          {/*This the part of Consulatation Part */}
          <ConsultDoctors/>

          {/*This the part of Testimonial Part */}
          <Testimonial/>

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

});

export default Dashboard;