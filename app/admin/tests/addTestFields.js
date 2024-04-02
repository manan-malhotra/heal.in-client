import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { theme } from "../../../constants/Colors";
import Header from "../../../components/Header";
import MyTextInput from "../../../components/TextInput";
import axios from "axios";

const AddTestFields = () => {
  const params = useLocalSearchParams();
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");

  const handleSubmit = () => {
    console.log("Resources: ", question, option1, option2, option3, option4);
    handleAddQuestion();
  };
  const handleAddQuestion = async () => {
    var url = "";
    if (params.name == "ADHD") url = "/admin/addADHDTest";
    else if (params.name == "Depression") url = "/admin/addDepressionTest";
    else if (params.name == "Anxiety") url = "/admin/addAnxietyTest";
    try {
      const response = await axios.post(process.env.API_HOST + url, {
        question: question,
        option1: option1,
        option2: option2,
        option3: option3,
        option4: option4,
      });
      if (response.status === 200) {
        console.log("SUCCESS");
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
      }
    } catch (error) {
      console.log("Error saving post: " + error);
      console.log(error.data.message);
    }
  };

  return (
    <View style={styles.body}>
      <Header title={params.name} />
      <View
        style={{ backgroundColor: "white", height: hp(70), paddingTop: "8%" }}
      >
        <MyTextInput
          placeholderText="Question"
          icon=""
          onChangeText={setQuestion}
        />
        <MyTextInput
          placeholderText="Option 1"
          icon=""
          onChangeText={setOption1}
        />
        <MyTextInput
          placeholderText="Option 2"
          icon=""
          onChangeText={setOption2}
        />
        <MyTextInput
          placeholderText="Option 3"
          icon=""
          onChangeText={setOption3}
        />
        <MyTextInput
          placeholderText="Option 4"
          icon=""
          onChangeText={setOption4}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: wp(43),
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
                Add Question
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
export default AddTestFields;

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
});
