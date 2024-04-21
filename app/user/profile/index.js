import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";
import React from "react";
import { useAuth } from "../../../context/authcontext";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { theme } from "../../../constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import Avatar from "../../../components/Avatar";

const Profile = () => {
  const user = useLocalSearchParams();
  const { logout } = useAuth();
  const phoneNumber = "9152987821";

  const handleCallNumber = () => {
    const phoneUrl = `tel:${phoneNumber}`;
    Linking.openURL(phoneUrl);
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <View style={{ height: hp(9) }} />
      <View
        style={{
          height: hp(20),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            height: hp(12),
            width: wp(26),
            borderRadius: 999,
          }}
        >
          <Avatar userId={user.userId} gender={user.gender} role={user.role} />
        </View>
        <View style={{ padding: 14 }} />
        <View
          style={{
            height: hp(10),
            flex: 1,
          }}
        >
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
            {user.role === "DOCTOR" ? "Dr. " : ""}
            {user.firstName + " " + user.lastName}
          </Text>
        </View>
      </View>
      <View style={{ padding: hp(1.5) }} />
      <View style={{ flex: 1 }}>
        <ProfileCard
          iconType="Material"
          icon="mail-outline"
          legend="Email"
          value={user.email}
          legendColor={"#6D6D6D"}
          valueColor={"#000000"}
        />
        <ProfileCard
          iconType="Feather"
          icon="smartphone"
          legend="Phone"
          value={user.contact}
          legendColor={"#6D6D6D"}
          valueColor={"#000000"}
        />
        <ProfileCard
          iconType="Ant"
          icon="calendar"
          legend="Age"
          value={user.age + " years"}
          legendColor={"#6D6D6D"}
          valueColor={"#000000"}
        />
        <ProfileCard
          iconType="MaterialCommunity"
          icon="gender-male-female"
          legend="Gender"
          value={user.gender}
          legendColor={"#6D6D6D"}
          valueColor={"#000000"}
        />
        <TouchableOpacity
          onPress={() => {
            handleCallNumber();
          }}
        >
          <ProfileCard
            iconType="Feather"
            icon="phone"
            value="9152987821"
            legend="Emergency Number"
            legendColor={"#6D6D6D"}
            valueColor={"#000000"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: `./profile/changePassword`,
              params: user,
            });
          }}
        >
          <ProfileCard
            iconType="Feather"
            icon="lock"
            legend="Change Password"
            legendColor={"#6D6D6D"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            router.push("../../privacyPolicy");
          }}
        >
          <ProfileCard
            iconType="Feather"
            icon="bookmark"
            legend="Privacy Policy"
            legendColor={"#6D6D6D"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => logout()}>
          <ProfileCard
            iconType="Feather"
            icon="log-out"
            legend="Logout"
            legendColor={theme.colors.error}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});

const ProfileCard = ({
  iconType,
  icon,
  legend,
  value,
  legendColor,
  valueColor,
}) => {
  let Icon;
  switch (iconType) {
    case "Feather":
      Icon = Feather;
      break;
    case "Material":
      Icon = MaterialIcons;
      break;
    case "MaterialCommunity":
      Icon = MaterialCommunityIcons;
      break;
    case "Ant":
      Icon = AntDesign;
  }
  return (
    <View
      style={{
        height: hp(7),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 40,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
        <Icon name={icon} size={hp(2.5)} color={legendColor}></Icon>
        <Text
          style={{
            fontSize: hp(1.7),
            fontWeight: "600",
            color: legendColor,
          }}
        >
          {legend}
        </Text>
      </View>
      <Text style={{ fontSize: hp(1.7), fontWeight: "600", color: valueColor }}>
        {value}
      </Text>
    </View>
  );
};
