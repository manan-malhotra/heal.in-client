import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../../constants/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AddCards from "../../../components/AddCards";
import Title from "../../../components/Title";
import axios from "axios";

const AddTests = () => {
    const [tests, setTests] = useState([]);
    const getTests = async () => {
        try {
            const response = await axios.get(
                process.env.API_HOST + "/test/getAll"
            );
            console.log(response.data);
            setTests(response.data);
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
                {/* <AddCards
          name="Postpartum"
          icon="book-open"
          route="/admin/tests/addTestFields"
        />
        <AddCards
          name="Youth Mental Health"
          icon="book-open"
          route="/admin/tests/addTestFields"
        /> */}
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

export default AddTests;
