import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Stack, Tabs, useLocalSearchParams } from "expo-router";
import Icon from "react-native-vector-icons/AntDesign";
import Icon3 from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/Feather";

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
          name="assessment"
          initialParams={user}
          options={{
            title: "Assessment",
            tabBarIcon: ({ focused, color, size }) => (
              <Icon2
                name="book"
                size={24}
                color={focused ? "black" : "#adadad"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="doctors"
          initialParams={user}
          options={{
            title: "Doctors",
            tabBarIcon: ({ focused, color, size }) => (
              <Icon3
                name="stethoscope"
                size={24}
                color={focused ? "black" : "#adadad"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="journal"
          options={{
            title: "Journal",
            tabBarIcon: ({ focused, color, size }) => (
              <Icon2
                name="book-open"
                size={24}
                color={focused ? "black" : "#adadad"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          initialParams={user}
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
