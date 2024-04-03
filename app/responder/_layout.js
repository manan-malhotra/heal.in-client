import React from "react";
import { Tabs, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/Ionicons";

export default function _layout() {
    const user = useLocalSearchParams();
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarHideOnKeyboard: true,
                }}
            >
                <Tabs.Screen
                    name="home"
                    initialParams={user}
                    options={{
                        title: "Home",
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon
                                name="home"
                                size={24}
                                color={focused ? "black" : "#adadad"}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="review"
                    initialParams={user}
                    options={{
                        title: "Reviews",
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon3
                                name="alert-circle-outline"
                                size={26}
                                color={focused ? "black" : "#adadad"}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ focused, color, size }) => (
                            <Icon
                                name="user"
                                size={24}
                                color={focused ? "black" : "#adadad"}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
