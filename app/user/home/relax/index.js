import { theme } from "../../../../constants/Colors";
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const Relax = () => {
    const router = useRouter();
    const { role } = useLocalSearchParams();
    const exerciseData=[
        {
            id: 0,
            name: 'Circle'
        },
        {
            id: 1,
            name: 'Square'
        },
        {
            id: 2,
            name: '4-7-8'
        }
    ];

    return (
        <>
            <View style={styles.body}>
                {exerciseData.map((exercise) => (
                    <TouchableOpacity
                        key={exercise.id} // Added key prop for React
                        style={styles.buttonCard}
                        onPress={() => {
                            console.log("User: ", role);
                            console.log("Exercise: ", exercise.name);
                            router.back();
                            router.navigate({
                                pathname: role.toLowerCase() + `/home/relax/breathing` + `${exercise.name}`,
                            });
                        }}
                    >
                        <Text style={styles.button}>{exercise.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    );
};

export default Relax;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: 'white'
    },
    buttonCard: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        padding: "5%",
        borderRadius: 10,
        marginTop: "5%",
        borderColor: theme.colors.primary,
        borderWidth: 1,
        alignItems: "center",
    },
    button: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.colors.button,
    },
});
