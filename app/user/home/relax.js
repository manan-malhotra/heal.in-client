import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../../constants/Colors";
import React, { useRef, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    TouchableOpacity,
} from "react-native";
import { router, useRouter } from "expo-router";

const Relax = () => {
    const router = useRouter();
    return (
        <View style = {styles.container}>
            <TouchableOpacity
                style={styles.buttonCard}
                onPress={() => {
                    router.push({pathname : "./breathing_circle"});
                }}
            >
                <Text style={styles.button}>Circle</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonCard}
                onPress={() => {
                    router.push({pathname : "./breathing_square"});
                }}
            >
                <Text style={styles.button}>Square</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonCard}
                onPress={() => {
                    router.push({pathname : "./breathing_478"});
                }}
            >
                <Text style={styles.button}>4-7-8</Text>
            </TouchableOpacity>
            
        </View>
    );
};

export default Relax;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    buttonCard: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "5%",
        borderRadius: 10,
        marginTop: "5%",
        borderColor: theme.colors.primary,
        borderWidth: 1,
        alignItems: "center",
    },
    button: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.colors.button,
    },
});
