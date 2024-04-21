import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

const _layout = () => {
  const data = useLocalSearchParams();
  return (
    <Stack>
      <Stack.Screen
        name="index"
        initialParams={data}
        options={{
          headerShown: false,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerTintColor: "black",
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
      <Stack.Screen
        name="changePassword"
        initialParams={data}
        options={{
          headerShown: true,
          headerTitle: "",
          headerBackTitleVisible: false,
          headerTintColor: "black",
          headerShadowVisible: false,
          headerBackTitleVisible: false,
        }}
      />
    </Stack>
  );
};

export default _layout;
