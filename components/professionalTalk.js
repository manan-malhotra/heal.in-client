import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { useRouter } from "expo-router";

const ProfessionalTalk = () => {
    const router = useRouter();
    const navigation = useNavigation(); // Hook for accessing navigation object

    return (
        <>
            {/*This the part of Professional Talk Part */}
            <View style={styles.professionaltalk}>
                <TouchableOpacity
                    onPress={() => {
                        router.push("forum");
                    }}
                >
                    <View style={styles.toppart}>
                        <View style={styles.leftpartblog}>
                            <Text style={styles.professionaltalk_title}>
                                {" "}
                                Talk to our trained experts ...{" "}
                            </Text>
                            <View style={styles.blogCard}>
                                <Image
                                    source={require("../assets/images/ProfessionalTalk/profile1.png")}
                                    style={styles.blogimage}
                                />
                                <View style={styles.innerBlogCard}>
                                    <View>
                                        <Text style={styles.blogTitle}>
                                            Diet for a sugar patient?
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.blogCard}>
                                <Image
                                    source={require("../assets/images/ProfessionalTalk/profile2.png")}
                                    style={styles.blogimage}
                                />
                                <View style={styles.innerBlogCard}>
                                    <View>
                                        <Text style={styles.blogTitle}>
                                            What is an ideal weight loss plan?
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.blogCard}>
                                <Image
                                    source={require("../assets/images/ProfessionalTalk/profile3.png")}
                                    style={styles.blogimage}
                                />
                                <View style={styles.innerBlogCard}>
                                    <View>
                                        <Text style={styles.blogTitle}>
                                            How to deal with anxiety?
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            <Image
                                source={require("../assets/images/ProfessionalTalk/forums1.png")}
                                style={styles.rightpartimage}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    professionaltalk: {
        marginTop: "2%",
    },
    professionaltalk_title: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: 15,
    },
    toppart: {
        textAlign: "left",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 30,
        marginLeft: "2%",
        marginRight: "2%",
    },
    leftpartblog: {
        marginRight: "2%",
        width: "55%",
    },
    rightpartimage: {
        justifyContent: "center",
        marginTop: "20%",
        width: 145,
        height: 160,
    },
    blogimage: {
        width: "16%",
        alignSelf: "center",
        height: "90%",
    },
    innerBlogCard: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: 10,
        width: "80%",
        height: "100%",
    },
    blogCard: {
        justifyContent: "space-evenly",
        backgroundColor: "#FFB68D",
        flexDirection: "row",
        borderRadius: 25,
        padding: 5,
        marginBottom: "5%",
    },
    blogTitle: {
        fontSize: 10,
        textAlign: "center",
    },
});

export default ProfessionalTalk;
