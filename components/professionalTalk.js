import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook
import { useRouter } from "expo-router";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

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
        marginTop: heightPercentageToDP(3),
    },
    professionaltalk_title: {
        fontSize: 13,
        fontWeight: "bold",
        marginBottom: heightPercentageToDP(3.5),
    },
    toppart: {
        textAlign: "left",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: heightPercentageToDP(3),
    },
    leftpartblog: {
        marginRight: widthPercentageToDP(1),
        width: widthPercentageToDP(56),
    },
    rightpartimage: {
        justifyContent: "center",
        marginTop: heightPercentageToDP(4),
        width: widthPercentageToDP(40),
        height: heightPercentageToDP(22),
    },
    blogimage: {
        width: widthPercentageToDP(7.5),
        alignSelf: "center",
        height: heightPercentageToDP(3.7),
    },
    innerBlogCard: {
        backgroundColor: "#fff",
        borderRadius: 25,
        padding: widthPercentageToDP(2.8),
        width: widthPercentageToDP(40),
        height: heightPercentageToDP(4.3),
    },
    blogCard: {
        justifyContent: "space-evenly",
        backgroundColor: "#FFB68D",
        flexDirection: "row",
        borderRadius: 25,
        padding: heightPercentageToDP(0.68),
        marginBottom: heightPercentageToDP(1.5),
    },
    blogTitle: {
        fontSize: 10,
        textAlign: "center",
    },
});

export default ProfessionalTalk;
