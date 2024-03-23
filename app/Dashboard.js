import React  from 'react';
import { View, StyleSheet } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { ScrollView } from 'react-native';

import ProfessionalTalk from '../components/professionalTalk';
import HealthResources from '../components/healthResources';
import SelfAssessmentTools from '../components/selfAssessmentTools';
import ConsultDoctors from '../components/consultDoctors';
import Testimonial from '../components/testimonial';
import { widthPercentageToDP } from 'react-native-responsive-screen';

const Dashboard = () => {
  const gradientColors = ['rgba(255,255,255,0.2)', 'rgba(110,113,254,0.6)', 'rgba(4,0,207,0.4)'];
  return (
    <View>
      <LinearGradient colors={gradientColors}  style={styles.gradient}>
        <ScrollView style = {styles.scrollview}>
          <View style = {styles.mainView}>

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
  
  mainView:{
    marginLeft: widthPercentageToDP(2),
    marginRight: widthPercentageToDP(2)
  },

});

export default Dashboard;