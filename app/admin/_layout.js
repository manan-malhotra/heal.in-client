import React from "react";
import { Tabs, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";

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
          options={{
            title: "Add Users",
            tabBarIcon: ({ focused, color, size }) => (
              <Feather
                name="user-plus"
                size={24}
                color={focused ? "black" : "#adadad"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="tests"
          options={{
            title: "Add Tests",
            tabBarIcon: ({ focused, color, size }) => (
              <Feather
                name="edit"
                size={24}
                color={focused ? "black" : "#adadad"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="resources"
          options={{
            title: "Add Resources",
            tabBarIcon: ({ focused, color, size }) => (
              <Feather
                name="airplay"
                size={24}
                color={focused ? "black" : "#adadad"}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="adminProfile"
          initialParams={user}
          options={{
            title: "Admin Profile",
            tabBarIcon: ({ focused, color, size }) => (
              <Feather
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
