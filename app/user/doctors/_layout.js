import { Stack, useLocalSearchParams } from "expo-router";

const _layout = () => {
  const user = useLocalSearchParams();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        initialParams={user}
        options={{
          headerTitle: "heal.in",
        }}
      />
    </Stack>
  );
};
export default _layout;
