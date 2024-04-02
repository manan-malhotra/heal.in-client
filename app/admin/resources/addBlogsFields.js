import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useState } from "react";
import { theme } from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import Header from "../../../components/Header";
import MyTextInput from "../../../components/TextInput";
import axios from "axios";

const AddBlogsFields = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    console.log("Resources: ", title, description);
    handleAddBlog();
  };
  const handleAddBlog = async () => {
    try {
      const response = await axios.post(
        process.env.API_HOST + "/admin/addBlogs",
        {
          description: description,
          title: title,
          user_id: 28,
        }
      );
      if (response.status === 200) {
        console.log("SUCCESS");
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      console.log("Error saving post: " + error);
      console.log(error.data.message);
    }
  };

  return (
    <View style={styles.body}>
      <Header title="Blogs" />
      <View
        style={{ backgroundColor: "white", height: hp(70), paddingTop: "8%" }}
      >
        <MyTextInput
          placeholderText="Title"
          icon=""
          isEmail={true}
          onChangeText={setTitle}
        />
        <View
          style={{
            paddingTop: hp(0.7),
            width: wp(80),
            marginRight: "auto",
            marginLeft: "auto",
          }}
        >
          <View style={styles.card}>
            <Feather name="" size={22} color="black" style={styles.icon} />
            <TextInput
              placeholder="Description"
              style={[styles.textInput, styles.bioInput]}
              keyboardType="default"
              multiline={true}
              numberOfLines={400}
              onChangeText={setDescription}
              value={description}
            />
          </View>
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: wp(45),
            backgroundColor: theme.colors.primary,
            height: hp(5.5),
            borderRadius: 20,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <TouchableOpacity onPress={() => handleSubmit()}>
              <Text
                style={{ fontSize: hp(2.2), fontWeight: "600", color: "white" }}
              >
                Add Blog
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AddBlogsFields;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "white",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: theme.colors.text,
    backgroundColor: "#fff",
    marginBottom: hp(2),
  },
  icon: {
    marginRight: wp(4),
    marginLeft: wp(3),
  },
  textInput: {
    flex: 1,
    height: 40,
    borderWidth: 0,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: "600",
  },
  bioInput: {
    height: 400,
  },
});
