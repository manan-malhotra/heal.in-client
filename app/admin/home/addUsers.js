import { StyleSheet, View } from "react-native";
import React from "react";
import { theme } from "../../../constants/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AddCards from "../../../components/AddCards";
import Title from "../../../components/Title";

const AddUsers = () => {
  return (
    <View style={styles.body}>
      <View style={{ paddingBottom: 0 }}></View>
      <Title title="Add Users" />
      <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
        <AddCards name="User" icon="user" route="/admin/home/addUsersFields" />
        <AddCards
          name="Doctor"
          icon="user"
          route="/admin/home/addDoctorFields"
        />
        <AddCards
          name="Responder"
          icon="user"
          route="/admin/home/addResponderFields"
        />
        <AddCards
          name="Moderator"
          icon="user"
          route="/admin/home/addModeratorFields"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: hp(10),
  },
});

export default AddUsers;
