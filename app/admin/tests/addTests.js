import { StyleSheet, View } from "react-native";
import React from "react";
import { theme } from "../../../constants/Colors";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AddCards from "../../../components/AddCards";
import Title from "../../../components/Title";

const AddTests = () => {
    return (
        <View style={styles.body}>
            <View style={{ paddingBottom: 0 }}></View>
            <Title title="Add Tests" />
            <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
                <AddCards
                    name="ADHD"
                    icon="book-open"
                    route="/admin/tests/addTestFields"
                />
                <AddCards
                    name="Anxiety"
                    icon="book-open"
                    route="/admin/tests/addTestFields"
                />
                <AddCards
                    name="Depression"
                    icon="book-open"
                    route="/admin/tests/addTestFields"
                />
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
