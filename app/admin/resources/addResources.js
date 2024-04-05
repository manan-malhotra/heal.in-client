import { StyleSheet, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import AddCards from "../../../components/AddCards";
import Title from "../../../components/Title";
import { useLocalSearchParams } from "expo-router";

const AddResources = () => {
    const user = useLocalSearchParams();
    return (
        <View style={styles.body}>
            <View style={{ paddingBottom: 0 }}></View>
            <Title title="Add Resources" />
            <View style={{ backgroundColor: "#ffffff", flex: 1 }}>
                <AddCards
                    name="Blogs"
                    icon="file-text"
                    route="/admin/resources/addBlogsFields"
                />
                <AddCards
                    name="Videos"
                    icon="video"
                    route="/admin/resources/addVideosFields"
                />
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

export default AddResources;
