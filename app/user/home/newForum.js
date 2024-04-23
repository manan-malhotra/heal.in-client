import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../../constants/Colors";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { sentimentScore } from "../../../common/sentiment";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
const NewForum = () => {
  const user = useLocalSearchParams();
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    if(query.trim() != ""){
      setError("");
    }
  },[query])
  const handleSubmit = async () => {
    function validateFormData(query) {
      let error = "";
      if(query.trim() === ""){
        error = "Query cannot be empty."
      }
      return error;
    }
    const validationError = validateFormData(query);
    setError(validationError);

    
    if (validationError != "") {
      return;
    }

    try {
      const score = await sentimentScore(query);
      if (score < -0.2) {
        Alert.alert(
          "Warning",
          "Please refrain from using negative words in your query.",
          [{ text: "Ok" }]
        );
        return;
      }
      const response = await axios.post(
        process.env.API_HOST + "/api/user/addQuestion",
        {
          question: query,
          userId: user.userId,
          description: "",
        }
      );
      if (response.status === 200) {
        console.log("success");
        //changed because not working
        router.push("./");
        // router.dismissAll();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.body}>
      <ScrollView style={styles.question}>
        <ErrorView error={error} />
        <View style={styles.query}>
          <TextInput
            placeholder="Ask your question..."
            placeholderTextColor={theme.colors.primary}
            style={styles.queryText}
            onKeyPress={(e) => {
              if (e.nativeEvent.key === "Enter") {
                handleSubmit();
              }
            }}
            onChangeText={(text) => {
              setQuery(text);
            }}
            multiline
          />
        </View>
      </ScrollView>
      <KeyboardAvoidingView behavior="padding">
        <TouchableOpacity
          style={styles.submit}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default NewForum;

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
        paddingTop: hp(3),
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
    paddingTop: "5%",
    paddingHorizontal: "5%",
  },
  question: {
    width: "100%",
    flex: 1,
    height: "80%",
    // backgroundColor: theme.colors.background,
    borderRadius: 10,
    marginTop: "5%",
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  query: {
    marginTop: "4%",
    padding: "7%",
    height: "80%",
  },
  submitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    zIndex: 1,
  },
  queryText: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: 0.5,
    height: 500,
  },
  submit: {
    width: "45%",
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 10,
    backgroundColor: theme.colors.primary,
    paddingBottom: "2%",
    paddingTop: "2%",
    borderColor: theme.colors.primary,
    borderWidth: 1,
    marginTop: "10%",
    borderRadius: 10,
    marginBottom: "5%",
  },
  submitText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    zIndex: 1,
  },
  error: {
    color: theme.colors.error,
  },
});
