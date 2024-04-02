import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../constants/Colors";
const FloatingButton = () => {
    return (
        <View style={styles.floatingButton}>
            <Icon name="add-sharp" style={styles.floatingButtonIcon} />
        </View>
    );
};

export default FloatingButton;

const styles = StyleSheet.create({
    floatingButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: theme.colors.button,
    },
    floatingButtonIcon: {
        color: "white",
        fontSize: 30,
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "auto",
        marginBottom: "auto",
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
});
