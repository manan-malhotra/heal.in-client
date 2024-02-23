import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      <View style={styles.footerColumn}>
        <Text style={styles.footerText}>Home</Text>
        <Text style={styles.footerText}>Forums</Text>
        <Text style={styles.footerText}>Resources</Text>
      </View>
      <View style={styles.footerColumn}>
        <Text style={styles.footerText}>Journals</Text>
        <Text style={styles.footerText}>Self Help</Text>
        <Text style={styles.footerText}>Specialists</Text>
      </View>
      <View style={styles.footerColumn}>
        <Text style={styles.footerText}>About</Text>
        <Text style={styles.footerText}>Contact us</Text>
        <Text style={styles.footerText}>Carriers</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  footerColumn: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  footerText: {
    color: 'white',
    marginBottom: 4,
  },
});

export default Footer;
