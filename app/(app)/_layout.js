import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="home"
                    options={{
                        headerTitle: "heal.in",
                        headerStyle:{
                            backgroundColor: "#3340B0"
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="blog"
                    options={{
                        headerTitle: "Blogs",
                        headerStyle:{
                            backgroundColor: "#3340B0"
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                <Stack.Screen
                    name="journal"
                    options={{
                        headerTitle: "Journals",
                        headerStyle:{
                            backgroundColor: "#3340B0"
                        },
                        headerTintColor: "white",
                        navigationBarColor: "#3340B0",
                    }}
                />
                
            </Stack>
        </>
    );
}
