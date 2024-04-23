import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "../../../constants/Colors";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
const newJournal = () => {
    const {
        id,
        title: oldTitle,
        description: oldDescription,
    } = useLocalSearchParams();
    const [title, setTitle] = useState(oldTitle || "");
    const [description, setDescription] = useState(oldDescription || "");
    const [error, setError] = useState("");
    useEffect(() => {
        if(title.trim() != "" && description.trim() !=""){
            setError("")
        }
    }, [title, description]);
    const handleSubmit = async () => {
        function validateFormData(title, description) {
            let error = "";
            if(title.trim() === "" || description.trim() ===""){
                console.log(error);
                error = "Title or description cannot be empty."
            }
            return error;
        }
        const validationError = validateFormData(title, description);
        setError(validationError);
        if(validationError!=""){
            console.log(error);
            return;
        }
        const json = {
            title,
            description,
        };
        if (id) {
            json["entryId"] = id;
            try {
                const response = await axios.put(
                    process.env.API_HOST + "/api/journal/edit",
                    json
                );
                console.log(response.status);
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const response = await axios.post(
                    process.env.API_HOST + "/api/journal",
                    json
                );
                console.log(response.status);
            } catch (error) {
                console.log(error);
            }
        }
        router.push("./");
    };
    return (
        <>
            <View style={styles.body}>
                {error!="" && <ErrorView error={error} />}
                <View style={styles.heading}>
                    <TextInput
                        placeholder="Title"
                        placeholderTextColor={theme.colors.primary}
                        style={styles.title}
                        multiline
                        value={title}
                        onChangeText={(text) => setTitle(text)}
                    />
                    <View style={styles.line} />
                </View>
                <ScrollView>
                    <View style={styles.description}>
                        <TextInput
                            placeholder="Description"
                            placeholderTextColor={theme.colors.primary}
                            style={styles.descriptionText}
                            multiline
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                            numberOfLines={10}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity
                    style={styles.submit}
                    onPress={() => {
                        handleSubmit();
                    }}
                >
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default newJournal;

const ErrorView = ({ error }) => {
    return (
      <View
        style={{
          justifyContent: "flex-start",
          paddingBottom: 10,
          width: wp(80),
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: hp(-1),
          paddingTop: hp(1),
          marginBottom: hp(0.45),
        }}
      >
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  };

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
        paddingHorizontal: "5%",
        paddingTop: "1%",
    },
    heading: {
        marginTop: "10%",
    },
    title: {
        fontSize: 30,
        fontWeight: "bold",
        color: theme.colors.primary,
    },
    options: {
        flexDirection: "row",
        alignItems: "center",
        width: "35%",
        marginLeft: "auto",
        height: 30,
        borderRadius: 5,
        justifyContent: "space-evenly",
    },
    line: {
        borderBottomColor: theme.colors.primary,
        borderBottomWidth: 1,
        width: "100%",
        marginTop: "5%",
        opacity: 0.5,
    },
    description: {
        marginTop: "4%",
        padding: "7%",
    },
    descriptionText: {
        fontSize: 16,
        fontWeight: "500",
        letterSpacing: 0.5,
        height: 500,
    },
    submit: {
        width: "45%",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: 10,
        backgroundColor: theme.colors.primary,
        paddingBottom: "2%",
        paddingTop: "2%",
        borderColor: theme.colors.primary,
        borderWidth: 1,
        marginTop: "10%",
        borderRadius: 10,
        marginBottom: "5%",
    },
    submitText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        zIndex: 1,
    },
    error: {
        color: theme.colors.error,
    },
});
