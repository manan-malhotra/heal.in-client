import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

export default function _layout() {
    const params = useLocalSearchParams();
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="home"
                    options={{
                        headerTitle: "heal.in",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="blog"
                    options={{
                        headerTitle: "Blogs",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="journal"
                    options={{
                        headerTitle: "Journals",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="newJournal"
                    options={{
                        headerTitle: "New Journal Entry",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="chats"
                    options={{
                        headerTitle: "Doctors",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="forum"
                    options={{
                        headerTitle: "QnA Forum",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="self_help_videos"
                    options={{
                        headerTitle: "Self Help Videos",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="assessment/index"
                    options={({ route }) => ({
                        title: route.params.test + " Test",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    })}
                />
                <Stack.Screen
                    name="assessment/scoreCard"
                    options = {{
                        headerTitle: "Score-Card",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="responderReview"
                    options = {{
                        headerTitle: "Responder",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="doctorDashboardNavigation"
                    options = {{
                        headerTitle: "Doctor's Home",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="adminDashboardNavigation"
                    options = {{
                        headerTitle: "heal.in",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                /> 
                <Stack.Screen
                    name="newQuestions"
                    options = {{
                        headerTitle: "heal.in",
                        headerStyle: {
                            backgroundColor: "#3340B0",
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
            </Stack>
        </>
    );
}
