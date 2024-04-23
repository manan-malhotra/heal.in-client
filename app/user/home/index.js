import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { theme } from "../../../constants/Colors";
import { heightPercentageToDP } from "react-native-responsive-screen";
import ArticleCard from "../../../components/articleCard";
import { getAllBlogs } from "../../../common/userApi";
import Avatar from "../../../components/Avatar";
import * as LocalAuthentication from "expo-local-authentication";
const Home = () => {
    const user = useLocalSearchParams();
    const [blogData, setBlogData] = useState([]);
    const [greeting, setGreeting] = useState("Good Morning");
    const passcode = async () => {
        // const result = await LocalAuthentication.authenticateAsync({
        //     promptMessage: "Please authenticate",
        //     fallbackLabel: "Enter Passcode",
        //     cancelLabel: "Can",
        // });
        console.log(result);
        if (!result.success) {
            console.log("Cancel mat kar dost");
        }
        if (result.success) {
            console.log("kar le dost");
        }
    };
    useEffect(() => {
        // passcode();
        getGreeting();
        getBlogData();
    }, []);
    const getBlogData = async () => {
        const response = await getAllBlogs();
        if (response.status === 200) {
            setBlogData(response.data.slice(0, 3));
        }
    };
    const getGreeting = () => {
        const currentHour = new Date().getHours();
        if (currentHour < 12) {
            setGreeting("Good Morning");
        } else if (currentHour < 18) {
            setGreeting("Good Afternoon");
        } else {
            setGreeting("Good Evening");
        }
    };
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.body}>
                <View style={styles.row}>
                    <View style={styles.avatar}>
                        <Avatar
                            userId={user.userId}
                            gender={user.gender}
                            role={user.role}
                        />
                    </View>
                    <View>
                        <Text style={styles.greetingHeader}>{greeting}</Text>
                        <Text style={styles.greetingName}>
                            {user.role == "DOCTOR" && "Dr. "}
                            {user.firstName} {user.lastName}
                        </Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                        <Text style={styles.articleHeader}>Articles</Text>
                    </View>
                    <View style={styles.seeAllContainer}>
                        <Pressable
                            onPress={() =>
                                router.push(
                                    user.role.toLowerCase() + "/home/blogs"
                                )
                            }
                        >
                            <Text style={styles.seeAll}>See All</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.articles}>
                    {blogData.map((blog) => (
                        <Pressable
                            key={blog.id}
                            onPress={() =>
                                router.push(
                                    user.role.toLowerCase() +
                                        `/home/blogs/${blog.id}`
                                )
                            }
                        >
                            <ArticleCard {...blog} />
                        </Pressable>
                    ))}
                </View>
                <View style={styles.verticalLine}></View>
                <View style={styles.row2}>
                    <View style={styles.itemContainer}>
                        <Pressable
                            onPress={() =>
                                router.push(
                                    user.role.toLowerCase() + "/home/forums"
                                )
                            }
                        >
                            <View style={styles.item}>
                                <Image
                                    source={require("../../../assets/images/forums.png")}
                                    style={styles.itemImage}
                                />
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() =>
                                router.push(
                                    user.role.toLowerCase() +
                                        "/home/selfHelpVideos"
                                )
                            }
                        >
                            <View style={styles.item}>
                                <Image
                                    source={require("../../../assets/images/videos.png")}
                                    style={styles.itemImage}
                                />
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() =>
                                router.push(
                                    {
                                        pathname: user.role.toLowerCase() + "/home/relax",
                                        params: {role: user.role}
                                    }
                                )
                            }
                        >
                            <View style={styles.item}>
                                <Image
                                    source={require("../../../assets/images/relax.png")}
                                    style={styles.itemImage}
                                />
                            </View>
                        </Pressable>
                    </View>
                    <View style={styles.itemTextContainer}>
                        <Pressable
                            onPress={() =>
                                router.push(
                                    user.role.toLowerCase() + "/home/forums"
                                )
                            }
                        >
                            <View style={styles.itemText}>
                                <Text style={styles.itemHeading}>Forums</Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={() =>
                                router.push(
                                    user.role.toLowerCase() +
                                        "/home/selfHelpVideos"
                                )
                            }
                        >
                            <View style={styles.itemText}>
                                <Text style={styles.itemHeading}>Videos</Text>
                            </View>
                        </Pressable>
                        <Pressable
                        onPress={() =>
                            router.push(
                                {
                                    pathname: user.role.toLowerCase() + "/home/relax",
                                    params: {role: user.role}
                                }
                            )
                        }
                        >
                            <View style={styles.itemText}>
                                <Text style={styles.itemHeading}>Relax</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </>
    );
};

export default Home;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
        paddingTop: "15%",
    },
    row: { flexDirection: "row" },
    avatar: {
        width: 50,
        height: 50,
        marginLeft: 15,
        marginRight: 10,
        marginVertical: 10,
    },
    greetingHeader: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold",
        fontSize: 15,
        color: theme.colors.primary,
    },
    greetingName: {
        marginHorizontal: 10,
        fontWeight: "bold",
        fontSize: 20,
    },
    articleHeader: {
        marginHorizontal: 10,
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold",
        fontSize: 20,
        color: theme.colors.secondary,
    },
    seeAllContainer: {
        marginLeft: "auto",
        marginRight: 30,
        marginVertical: 13,
    },
    seeAll: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: "bold",
        fontSize: 14,
        color: theme.colors.button,
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
    },
    articles: {
        height: "55%",
    },
    articleCard: {
        marginLeft: "auto",
        marginRight: "auto",
        width: "91%",
        height: 120,
        borderRadius: 10,
        backgroundColor: theme.colors.background,
        borderBlockColor: theme.colors.primary,
        borderWidth: 1,
        marginVertical: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        flexDirection: "row",
    },
    articleTitleContainer: {
        height: "100%",
        width: "65%",
    },
    articleTitle: {
        padding: "8%",
        fontSize: 16,
        fontWeight: "bold",
    },
    articleDateContainer: {
        // backgroundColor: theme.colors.secondary,
        height: "100%",
        width: "35%",
    },
    articleDate: {
        padding: "8%",
        paddingTop: "15%",
        fontSize: 13,
        fontWeight: "600",
        color: theme.colors.primary,
    },
    verticalLine: {
        height: heightPercentageToDP(0.1),
        width: "91%",
        alignSelf: "center",
        opacity: 0.2,
        backgroundColor: "black",
        marginVertical: 5,
    },
    itemContainer: {
        justifyContent: "center",
        alignItems: "center",
        height: 150,
        width: "91%",
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
    },
    itemTextContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: "91%",
        marginLeft: "auto",
        marginRight: "auto",
        flexDirection: "row",
    },
    item: {
        width: 110,
        height: 110,
        backgroundColor: theme.colors.background,
        marginHorizontal: 15,
        borderRadius: "100%",
        borderBlockColor: theme.colors.primary,
        borderWidth: 1,
        flexDirection: "row",
    },
    itemText: {
        height: 170,
        width: 110,
        marginHorizontal: 15,
        alignItems: "center",
    },
    itemHeading: { color: theme.colors.primary, fontWeight: "600" },
    itemImage: {
        width: 60,
        height: 60,
        alignSelf: "center",
        marginLeft: "auto",
        marginRight: "auto",
    },
});
