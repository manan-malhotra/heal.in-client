import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React from "react";
import { theme } from "../../../constants/Colors";
import Icon from "react-native-vector-icons/Feather";
const newJournal = () => {
    return (
        <View style={styles.body}>
            <View style={styles.heading}>
                {/* <TextInput placeholder="Title" /> */}
                <Text style={styles.title}>
                    Feeling Good on a Sunday Afternoon
                </Text>
                <View style={styles.line} />
            </View>
            <ScrollView>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}></Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default newJournal;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: "5%",
        paddingTop: "1%",
    },
    heading: {
        marginTop: "5%",
        height: 30,
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        width: "35%",
        marginLeft: "auto",
        height: 30,
        borderRadius: 5,
        justifyContent: "space-evenly",
    },
    line: {
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 1,
        width: "100%",
        marginTop: "5%",
        opacity: 0.5,
    },
    description: {
        marginTop: "4%",
        padding: "7%",
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.5,
    },
});
