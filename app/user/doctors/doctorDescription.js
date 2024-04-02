import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Header from "../../../components/Header";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { theme } from "../../../constants/Colors";
import Avatar from "../../../components/Avatar";

const DoctorDescription = () => {
    const data = useLocalSearchParams();
    const openChatRoom = (userData) => {
        const finalData = {
            email: userData.userEmail,
            firstName: userData.userFirstName,
            gender: userData.userGender,
            lastName: userData.userLastName,
            role: userData.userRole,
            userId: userData.userId,
            other_first_name: userData.doctorFirstName,
            other_last_name: userData.doctorLastName,
            other_userId: userData.doctorId,
        };
        console.log("FINAL DATA: ", finalData);
        router.push({
            pathname: "/chatRoomOut",
            params: finalData,
        });
    };
    return (
        <View style={styles.body}>
            <Header title="" />
            <View
                style={{
                    height: hp(22),
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <View
                    style={{
                        height: hp(11),
                        width: wp(22),
                        alignItems: "center",
                        justifyItems: "center",
                    }}
                >
                    <View style={styles.iconView}>
                        <Avatar
                            userId={data.doctorId}
                            gender={data.doctorGender}
                            role="Doctor"
                        />
                    </View>
                </View>
                <View
                    style={{
                        height: hp(4),
                        width: wp(40),
                        alignItems: "center",
                        justifyContent: "flex-end",
                    }}
                >
                    <Text style={{ fontSize: hp(2), fontWeight: "bold" }}>
                        Dr. {data.doctorFirstName + " " + data.doctorLastName}
                    </Text>
                </View>
                <View
                    style={{
                        height: hp(3),
                        width: wp(40),
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: hp(1.5),
                            color: "#A0A0A0",
                            fontWeight: "600",
                        }}
                    >
                        {data.specialization}
                    </Text>
                </View>
            </View>
            <View
                style={{
                    height: hp(7),
                    width: wp(100),
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                }}
            >
                <View
                    style={{
                        height: hp(7),
                        width: wp(20),
                        marginLeft: wp(10),
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: hp(1.5),
                            color: "#A0A0A0",
                            fontWeight: "600",
                        }}
                    >
                        Patients
                    </Text>
                    <View style={{ padding: hp(0.3) }}></View>
                    <Text
                        style={{
                            fontSize: hp(1.8),
                            color: theme.colors.text,
                            fontWeight: "700",
                        }}
                    >
                        120+
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor: "black",
                        height: hp(3.8),
                        width: wp(0.1),
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                ></View>
                <View
                    style={{
                        height: hp(7),
                        width: wp(20),
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: hp(1.5),
                            color: "#A0A0A0",
                            fontWeight: "600",
                        }}
                    >
                        Degree
                    </Text>
                    <View style={{ padding: hp(0.3) }}></View>
                    <Text
                        style={{
                            fontSize: hp(1.8),
                            color: theme.colors.text,
                            fontWeight: "700",
                        }}
                    >
                        {data.degree}
                    </Text>
                </View>
                <View
                    style={{
                        backgroundColor: "black",
                        height: hp(3.8),
                        width: wp(0.1),
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                ></View>
                <View
                    style={{
                        height: hp(7),
                        width: wp(20),
                        marginRight: wp(10),
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: hp(1.5),
                            color: "#A0A0A0",
                            fontWeight: "600",
                        }}
                    >
                        Experience
                    </Text>
                    <View style={{ padding: hp(0.3) }}></View>
                    <Text
                        style={{
                            fontSize: hp(1.8),
                            color: theme.colors.text,
                            fontWeight: "700",
                        }}
                    >
                        {data.experience} yrs+
                    </Text>
                </View>
            </View>
            <View style={{ padding: hp(1) }}></View>
            <View style={{ height: hp(40) }}>
                <View
                    style={{
                        height: hp(7),
                        flex: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            color: theme.colors.text,
                            fontWeight: "600",
                            fontSize: hp(2),
                        }}
                    >
                        About
                    </Text>
                    <View
                        style={{
                            backgroundColor: "black",
                            height: hp(0.1),
                            width: wp(80),
                            marginTop: hp(1.3),
                        }}
                    ></View>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                    <ScrollView>
                        <View
                            style={{
                                width: wp(79),
                                alignItem: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Text style={{ color: theme.colors.text }}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed doeiusmod tempor incididunt
                                ut labore et dolore magna aliqua. Semper feugiat
                                nibh sed pulvinar proin gravida. Iaculis eu non
                                diam phasellus vestibulum lorem sed risus.
                                Egestas erat imperdiet sed euismod nisi porta
                                lorem mollis. Tortor consequat id porta nibh
                                venenatis cras sed felis eget. Adipiscing diam
                                donec adipiscing tristique. Vel pharetra vel
                                turpis nunc eget.re urna nec tincidunt praesent
                                semper feugiat nibh sed. At risus viverra
                                adipiscing at. Mauris ultrices eros in cursus.
                                Pharetra vel turpis nunc eget lorem dolor sed
                                viverra ipsum. Libero volutpat sed cras ornare
                                arcu dui. Eu nisl nunc mi ipsum faucibus vitae
                                aliquet. Vivamus at augue eget arcu. Lorem ipsum
                                dolor sit amet, consectetur adipiscing elit, sed
                                do eiusmod tempor incididunt ut labore et dolore
                                magna aliqua. Semper feugiat nibh sed pulvinar
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
                <TouchableOpacity
                    onPress={() => {
                        openChatRoom(data);
                    }}
                >
                    <View
                        style={{
                            backgroundColor: theme.colors.button,
                            width: wp(42),
                            height: hp(5.6),
                            borderRadius: 30,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={{
                                color: "white",
                                fontSize: hp(1.8),
                                fontWeight: "700",
                            }}
                        >
                            Chat with Doctor
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default DoctorDescription;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
    },
    iconView: {
        width: "99%",
        aspectRatio: 1,
        borderRadius: 999,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: theme.colors.button,
    },
    avatar: {
        width: "100%",
        height: "100%",
    },
});
