import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { useRouter } from "expo-router";
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";

const SelfAssessmentTools = () => {
    const router = useRouter();
    const navigation = useNavigation();
    return (
        <>
            {/*This the part of Self Help Tools Part */}

            <View style={styles.sat}>
                <Text style={styles.sat_title}> Self Assessment Tools </Text>
                <View style={styles.sat_row}>
                    <View style={styles.sat_column}>
                        <View style={styles.satCard}>
                            <View style={styles.innersatCard}>
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push({
                                            pathname: "assessment",
                                            params: { test: "Depression" },
                                        });
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: "white",
                                            textAlign: "center",
                                            fontSize: 14,
                                        }}
                                    >
                                        DEPRESSION{"\n"}TEST
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: "white",
                                            textAlign: "center",
                                            fontSize: 30,
                                        }}
                                    >
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sat_column}>
                        <View style={styles.satCard}>
                            <View style={styles.innersatCard}>
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push({
                                            pathname: "assessment",
                                            params: { test: "Anxiety" },
                                        });
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: "white",
                                            textAlign: "center",
                                            fontSize: 14,
                                        }}
                                    >
                                        ANXIETY{"\n"}TEST
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: "white",
                                            textAlign: "center",
                                            fontSize: 30,
                                        }}
                                    >
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sat_column}>
                        <View style={styles.satCard}>
                            <View style={styles.innersatCard}>
                                <TouchableOpacity
                                    onPress={() => {
                                        router.push({
                                            pathname: "assessment",
                                            params: {
                                                test: "ADHD",
                                            },
                                        });
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: "white",
                                            textAlign: "center",
                                            fontSize: 14,
                                        }}
                                    >
                                        ADHD{"\n"}TEST
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            color: "white",
                                            textAlign: "center",
                                            fontSize: 30,
                                        }}
                                    >
                                        +
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    sat: {
        marginTop: heightPercentageToDP(3),
    },
    sat_title: {
        fontSize: 35,
        fontWeight: "bold",
        textAlign: "center",
    },
    sat_row: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: heightPercentageToDP(18),
        width: "100%",
    },
    sat_column: {
        flexDirection: "column",
    },
    satCard: {
        backgroundColor: "rgba(87, 152, 236, 0.7)",
        marginTop: heightPercentageToDP(3),
        height: heightPercentageToDP(15),
        flexDirection: "column",
        width: widthPercentageToDP(28),
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    innersatCard: {
        borderRadius: 10,
        justifyContent: "center",
    },
});

export default SelfAssessmentTools;
