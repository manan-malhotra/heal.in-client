import { Stack, useLocalSearchParams } from "expo-router";

export default function _layout() {
    const user = useLocalSearchParams();
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="addResources" initialParams={user} />
            <Stack.Screen name="addBlogsFields" initialParams={user} />
            <Stack.Screen name="addVideosFields" initialParams={user} />
        </Stack>
    );
}
