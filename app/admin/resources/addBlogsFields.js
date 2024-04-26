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
import React, { useEffect, useState } from "react";
import { theme } from "../../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import Header from "../../../components/Header";
import MyTextInput from "../../../components/TextInput";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";

const AddBlogsFields = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const user = useLocalSearchParams();
  useEffect(() => {
    if (title.trim() != "" && description.trim() != "") {
      setError("");
    }
  }, [title, description]);
  const handleSubmit = () => {
    handleAddBlog();
  };
  const handleAddBlog = async () => {
    function validateFormData(title, description) {
      let error = "";
      if (title.trim() === "" || description.trim() === "") {
        error = "Title or description cannot be empty.";
      }
      return error;
    }
    const validationError = validateFormData(title, description);
    setError(validationError);
    if (validationError != "") {
      return;
    }
    try {
      const json = {
        description: description,
        title: title,
        user_id: parseInt(user.userId),
      };
      const response = await axios.post(
        process.env.API_HOST + "/admin/addBlogs",
        json
      );
      if (response.status === 200) {
        console.log("SUCCESS");
        setTitle("");
        setDescription("");
        router.back();
      }
    } catch (error) {
      if (error.response.status === 502) {
        setError("Our servers are offline, try again later.");
      } else {
        setError("Unknown error.");
        console.log("Error saving post: " + error);
      }
    }
  };

  return (
    <View style={styles.body}>
      <Header title="Blogs" />

      <View
        style={{
          backgroundColor: "white",
          height: hp(70),
          paddingTop: "8%",
        }}
      >
        {error != "" && <ErrorView error={error} />}
        <MyTextInput
          placeholderText="Title"
          icon=""
          keyboardType="default"
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
        <TouchableOpacity onPress={() => handleSubmit()}>
          <View
            style={{
              width: wp(45),
              backgroundColor: theme.colors.button,
              height: hp(5.5),
              borderRadius: 20,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
              }}
            >
              <Text
                style={{
                  fontSize: hp(2.2),
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Add Blog
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AddBlogsFields;

const ErrorView = ({ error }) => {
  return (
    <View
      style={{
        justifyContent: "flex-start",
        paddingBottom: 10,
        width: wp(80),
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: hp(-1),
        paddingTop: hp(0),
        marginBottom: hp(0.45),
      }}
    >
      <Text style={styles.error}>{error}</Text>
    </View>
  );
};

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
    backgroundColor: theme.colors.background,
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
    height: 392,
  },
  error: {
    color: theme.colors.error,
  },
});
