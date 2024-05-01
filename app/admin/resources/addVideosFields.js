import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useEffect, useState } from "react";
import { theme } from "../../../constants/Colors";
import Header from "../../../components/Header";
import MyTextInput from "../../../components/TextInput";
import axios from "axios";
import { router } from "expo-router";

const AddVideosFields = () => {
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");
  const [error, setError] = useState("");
  const urlRegex1 = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/;
  // const urlRegex2 = /^https?:\/\/youtu\.be\/[\w-]{11}(\?[\w=&-]*)?$/
  useEffect(() => {
    if (
      title.trim() != "" &&
      url.trim() != "" &&
      error === "Title or URL cannot be empty."
    ) {
      setError("");
    }
    if (urlRegex1.test(url)) {
      setError("");
    }
  }, [url, title]);

  const handleSubmit = () => {
    handleAddVideo();
  };

  const handleAddVideo = async () => {
    function validateFormData(title, url) {
      let error = "";
      if (title.trim() === "" || url.trim() === "") {
        error = "Title or URL cannot be empty.";
      } else if (!urlRegex1.test(url)) {
        error = "Enter a valid Youtube video link.";
      }
      return error;
    }

    const validationError = validateFormData(title, url);
    setError(validationError);
    if (validationError) {
      return;
    }

    try {
      const response = await axios.post(
        process.env.API_HOST + "/admin/addSelfHelpVideos",
        {
          title: title,
          url: url,
        }
      );
      if (response.status === 200) {
        setTitle("");
        setURL("");
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
      <Header title="Videos" />
      <View
        style={{ backgroundColor: "white", height: hp(70), paddingTop: "8%" }}
      >
        {error != "" && <ErrorView error={error} />}
        <MyTextInput placeholderText="Title" icon="" onChangeText={setTitle} />
        <MyTextInput placeholderText="URL" icon="" onChangeText={setURL} />
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
                style={{ fontSize: hp(2.2), fontWeight: "600", color: "white" }}
              >
                Add Video
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default AddVideosFields;

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
  error: {
    color: theme.colors.error,
  },
});
