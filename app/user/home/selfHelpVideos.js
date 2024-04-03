import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    Text,
    Linking,
    ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import {
    heightPercentageToDP,
    widthPercentageToDP,
} from "react-native-responsive-screen";
import Header from "../../../components/Header";
import SearchBar from "../../../components/searchBar";
import { theme } from "../../../constants/Colors";
const SelfHelpVideo = () => {
    const [videos, setVideos] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredVideos, setFilteredVideos] = useState([]);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        try {
            const response = await axios.get(
                process.env.API_HOST + "/admin/getAllSelfHelpVideos"
            );
            const tempResponse = response.data.map((video) => ({
                ...video,
                thumbnailUrl: `https://img.youtube.com/vi/${
                    video.url.split("=")[1]
                }/hqdefault.jpg`,
                videoId: video.url.split("=")[1],
            }));
            setVideos(tempResponse);
            setFilteredVideos(tempResponse);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filteredData = videos.filter((video) =>
            video.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredVideos(filteredData);
    };

    const handleVideoPress = (videoId) => {
        Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
    };

    return (
        <View style={styles.body}>
            <Header title="Videos" />
            <View style={{ height: 20 }}></View>
            <SearchBar
                handleSearch={handleSearch}
                searchText={searchText}
                type="Videos"
            />
            <ScrollView style={styles.main}>
                {filteredVideos.map((video, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => handleVideoPress(video.videoId)}
                        style={styles.videoCard}
                    >
                        <View style={styles.videoItem}>
                            <Image
                                source={{ uri: video.thumbnailUrl }}
                                style={styles.thumbnail}
                            />
                            <View style={styles.videoTextContainer}>
                                <Text style={styles.videoTitle}>
                                    {video.title}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default SelfHelpVideo;

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: "white",
    },
    main: {
        paddingHorizontal: widthPercentageToDP(8),
    },
    videoCard: {
        borderColor: theme.colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: heightPercentageToDP(3.5),
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
    },
    videoItem: {
        backgroundColor: theme.colors.background,
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 20,
        elevation: 5,
        borderRadius: 10,
    },
    thumbnail: {
        width: widthPercentageToDP(30),
        height: heightPercentageToDP(8),
        borderRadius: 10,
        marginRight: widthPercentageToDP(5),
    },
    videoTextContainer: {
        flex: 1,
    },
    videoTitle: {
        paddingTop: 5,
        fontSize: 16,
        borderRadius: 10,
        color: "black",
        fontWeight: "600",
    },
});
