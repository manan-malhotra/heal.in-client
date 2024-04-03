import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";
import { theme } from "../../../constants/Colors";
import AddCards from "../../../components/AddCards";

const Review = () => {
    return (
        <View style={styles.body}>
            <Text style={styles.heading}>Flag</Text>
            <View style={styles.cards}>
                <AddCards
                    name={"Review Blog"}
                    icon={"edit"}
                    route={"/responder/review/blog"}
                />
                <AddCards
                    name={"Review QnA"}
                    icon={"help-circle"}
                    route={"/responder/review/qna"}
                />
            </View>
        </View>
    );
};

export default Review;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingTop: heightPercentageToDP(10),
        paddingHorizontal: widthPercentageToDP(7),
    },
    heading: {
        color: theme.colors.button,
        fontSize: 25,
        fontWeight: "bold",
        letterSpacing: 1,
        marginLeft: widthPercentageToDP(3),
    },
    cards: {
        marginTop: heightPercentageToDP(5),
        marginLeft: widthPercentageToDP(2),
        marginRight: widthPercentageToDP(2),
        height: heightPercentageToDP(67),
    },
});
