import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
import SearchBar from "../../../components/searchBar";
import { theme } from "../../../constants/Colors";
import axios from "axios";
import ChatCardUser from "../../../components/ChatCardUser";
const DoctorsChat = () => {
  const user = useLocalSearchParams();
  const [rooms, setRooms] = useState({});
  const [searchText, setSearchText] = useState("");
  const [renderData, setRenderData] = useState([]);
  const [doctors, setDoctors] = useState();

  const getDoctors = async () => {
    const response = await axios.get(process.env.API_HOST + "/doctors/getAll");
    setDoctors(response.data);
    setRooms([...response.data]);
    setRenderData([...response.data]);
  };

  const handleSearch = (text) => {
    setSearchText(text);
    const filter = rooms.map((doctor) => ({
      ...doctor,
      ["license_number"]:
        doctor.user_id.first_name + " " + doctor.user_id.last_name,
    }));
    const filteredData = filter.filter(
      (patient) =>
        patient.specialization.toLowerCase().includes(text.toLowerCase()) ||
        patient.license_number.toLowerCase().includes(text.toLowerCase())
    );
    setRenderData(filteredData);
  };
  useEffect(() => {
    getDoctors();
  }, []);

  return (
    <View style={styles.body}>
      <ScrollView>
        <View style={{ paddingBottom: 10 }}>
          <SearchBar
            handleSearch={handleSearch}
            searchText={searchText}
            type={"Doctors"}
          />
        </View>

        {renderData.length === 0 ? (
          <View
            style={{
              flex: 1,
              height: hp(70),
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={theme.colors.button} />
          </View>
        ) : (
          renderData.map((doctor) => (
            <ChatCardUser
              key={doctor.user_id.user_id}
              id={doctor.user_id.user_id}
              user={user}
              doctor={doctor}
              gender={doctor.user_id.gender.toLowerCase()}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default DoctorsChat;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: hp(10),
  },
});
