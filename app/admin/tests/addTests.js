import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import FloatingButton from "../../../components/floatingButton";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AddCards from "../../../components/AddCards";
import Title from "../../../components/Title";
import axios from "axios";
import { TouchableOpacity } from "react-native";
import { Alert } from "react-native";

const AddTests = () => {
  const [tests, setTests] = useState([]);
  const getTests = async () => {
    try {
      const response = await axios.get(process.env.API_HOST + "/test/getAll");
      console.log(response.data);
      setTests(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addTest = async (testName) => {
    try {
      await axios.post(process.env.API_HOST + "/test/add", {
        testName,
      });
      getTests();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTests();
  }, []);
  return (
    <View style={styles.body}>
      <View style={{ paddingBottom: 0 }}></View>
      <Title title="Add Tests" />
      <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
        {tests.map((test) => (
          <AddCards
            name={test.test_name}
            icon="book-open"
            route="/admin/tests/addTestFields"
            data={{ id: test.test_id }}
            key={test.test_id}
          />
        ))}
      </View>
      <TouchableOpacity
        onPress={() => {
          Alert.prompt(
            "Add Test",
            "Enter the name of the test",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "destructive",
              },
              {
                text: "Add",
                onPress: async (testName) => {
                  console.log("Test Name: ", testName);
                  addTest(testName);
                },
              },
            ],
            "plain-text",
          );
        }}
      >
        <FloatingButton />
      </TouchableOpacity>
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

export default AddTests;
