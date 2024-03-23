import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { useRouter } from "expo-router";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
const HealthResources = () => {
    const router = useRouter();
    const navigation = useNavigation(); // Hook for accessing navigation object

    return (
        <>
            {/*This the part of Resources Part */}

            <View style={styles.resources}>
                <Text style={styles.resources_title}> Resources </Text>
                <View style={styles.resources_row}>
                    <View style={styles.resources_column}>
                        <TouchableOpacity
                                onPress={() => {
                                    router.push("self_help_videos");
                                }}
                            >
                                <View style={styles.resCard}>
                                    <View style={styles.innerresCard}>
                                        <Image
                                            source={require("../assets/images/Resources/image1.png")}
                                            style={styles.resImage}
                                        />
                                    </View>
                                </View>
                        </TouchableOpacity>
                        <Text
                            style={{ fontStyle: "italic", textAlign: "center" }}
                        >
                            Self Help Videos
                        </Text>
                    </View>
                    <View style={styles.resources_column}>
                        <TouchableOpacity
                            onPress={() => {
                                router.push("journal");
                            }}
                        >
                            <View style={styles.resCard}>
                                <View style={styles.innerresCard}>
                                    <Image
                                        source={require("../assets/images/Resources/mindnotes.png")}
                                        style={styles.resImage}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                        <Text
                            style={{ fontStyle: "italic", textAlign: "center" }}
                        >
                            Journal
                        </Text>
                    </View>
                    <View style={styles.resources_column}>
                        <TouchableOpacity
                            onPress={() => {
                                router.push("blog");
                            }}
                        >
                            <View style={styles.resCard}>
                                <View style={styles.innerresCard}>
                                    <Image
                                        source={require("../assets/images/Resources/blog.png")}
                                        style={styles.resImage}
                                    />
                                </View>
                            </View>
                            <Text
                                style={{
                                    fontStyle: "italic",
                                    textAlign: "center",
                                }}
                            >
                                Blogs
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    resources: {
        marginTop: heightPercentageToDP(3),
        justifyContent: 'center'
    },
    resources_title: {
        fontSize: 35,
        fontWeight: "bold",
        textAlign: "center",
    },
    resources_row: {
        flexDirection: "row",
        justifyContent: 'space-between',
        height: heightPercentageToDP(18),
    },
    resources_column: {
        flexDirection: "column",
    },
    resCard: {
        backgroundColor: "#FFB68D",
        marginTop: heightPercentageToDP(3),
        height: heightPercentageToDP(12.5),
        width: widthPercentageToDP(25),
        flexDirection: "column",
        borderRadius: 100,
        padding: 3,
        marginBottom: heightPercentageToDP(1.5),
        alignItems: "center",
    },
    innerresCard: {
        backgroundColor: "#FFFFFF",
        height: heightPercentageToDP(11.7),
        width: widthPercentageToDP(23),
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },
    resImage: {
        borderRadius: 50,
        height: heightPercentageToDP(10.7),
        width: widthPercentageToDP(21),
    },
});

export default HealthResources;
