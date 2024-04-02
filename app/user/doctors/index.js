import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DoctorsChat from "./doctorsChat";
import { useLocalSearchParams } from "expo-router";

const DoctorHome = () => {
  const user = useLocalSearchParams();
  return (
    <>
      <DoctorsChat />
    </>
  );
};

export default DoctorHome;

const styles = StyleSheet.create({});
