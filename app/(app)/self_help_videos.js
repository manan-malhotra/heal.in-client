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
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const SelfHelpVideo = () => {
    const [videos, setVideos] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredVideos, setFilteredVideos] = useState([]);

    useEffect(() => {
        getVideos();
    }, []);

    const getVideos = async () => {
        try {
            const response = await axios.get(process.env.API_HOST + "/admin/getAllSelfHelpVideos");
            const tempResponse = response.data.map(video => ({
                ...video,
                thumbnailUrl: `https://img.youtube.com/vi/${video.url.split("=")[1]}/hqdefault.jpg`,
                videoId: video.url.split("=")[1]
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
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <AntDesign name="search1" size={24} color="black" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search Videos"
                    placeholderTextColor="black"
                    onChangeText={handleSearch}
                    value={searchText}
                />
            </View>
            <View style = {styles.videoCard}> 
                {filteredVideos.map((video, index) => (
                    <TouchableOpacity key={index} onPress={() => handleVideoPress(video.videoId)} style = {{ borderRadius: 20}}>
                        <View style={styles.videoItem}>
                            <Image source={{ uri: video.thumbnailUrl }} style={styles.thumbnail} />
                            <View style={styles.videoTextContainer}>
                                <Text style={styles.videoTitle}>{video.title}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        backgroundColor: "#456990",
        padding: widthPercentageToDP(5)
    },
    searchBarContainer: {
        marginTop: heightPercentageToDP(10),
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.4,
        borderColor: "gray",
        borderRadius: 10,
        marginBottom: 20,
        elevation: 2,

        backgroundColor: "white",
        borderRadius: 20

    },
    searchIcon: {
        paddingLeft: 10,
    },
    searchBar: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    video: {
        borderColor: 'black'
    },
    videoItem: {
        marginTop: heightPercentageToDP(2),
        marginBottom: heightPercentageToDP(1),
        backgroundColor: "white",
        flexDirection: "row",
        alignItems: "center",
        padding :15,
        elevation: 5,
        borderRadius: 20
    },
    thumbnail: {
        width: widthPercentageToDP(30),
        height: heightPercentageToDP(10),
        borderRadius: 20,
        marginRight: widthPercentageToDP(5),
    },
    videoTextContainer: {
        flex: 1,
    },
    videoTitle: {
        fontSize: 16,
        justifyContent: 'center',
        borderRadius: 10
    },
});

export default SelfHelpVideo;
