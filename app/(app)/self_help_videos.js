import React, { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    Text,
    Linking,
    ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Import AntDesign icon library
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";

// Component for displaying searchable video list
const SelfHelpVideo = () => {
    const [videos, setVideos] = useState([]);
    const getVideos = async () => {
        try {
            const response = await axios.get(
                process.env.API_HOST + "/admin/getAllSelfHelpVideos"
            );
            console.log(response.data);
            const tempResponse = [];
            response.data.forEach((video) => {
                const videoId = video.url.split("=")[1];
                video.thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                video.videoId = videoId;
                video.title = video.title;
                tempResponse.push(video);
            });
            setVideos(response.data);
            setFilteredVideos(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getVideos();
    }, []);

    const [searchText, setSearchText] = useState(""); // State for search term
    const [filteredVideos, setFilteredVideos] = useState(videos); // State for filtered videos

    const handleSearch = (text) => {
        setSearchText(text);
        let tempData = [...videos];
        tempData = tempData.filter((video) =>
            video.title.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredVideos(tempData);
    };

    const handleVideoPress = (videoId) => {
        // Open video on YouTube using Linking (adjust URL if needed)
        Linking.openURL(`https://www.youtube.com/watch?v=${videoId}`);
    };

    const renderVideoItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleVideoPress(item.videoId)}>
            <View style={styles.videoItem}>
                {/* Container for thumbnail and text */}
                <View style={styles.videoInfoContainer}>
                    {item.thumbnailUrl && (
                        <Image
                            source={{ uri: item.thumbnailUrl }}
                            style={styles.thumbnail}
                        />
                    )}
                    <View style={styles.videoTextContainer}>
                        <Text style={styles.videoTitle}>{item.title}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <LinearGradient
            colors={[
                "rgba(255,255,255,0.2)",
                "rgba(110,113,254,0.6)",
                "rgba(4,0,207,0.4)",
            ]}
            style={styles.container}
        >
            <View contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={styles.searchBarContainer}>
                        <AntDesign
                            name="search1"
                            size={24}
                            color="black"
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchBar} // Customize styles based on your desired search bar appearance
                            placeholder="Search Videos"
                            onChangeText={handleSearch}
                            value={searchText}
                        />
                        {/* <TouchableOpacity style={styles.searchButton} onPress={() => handleSearch(searchText)}>
            <Text style={styles.searchButtonText}>Search</Text>
          </TouchableOpacity> */}
                    </View>
                    <View style={styles.flatList}>
                        <FlatList
                            data={filteredVideos} // Use filteredVideos for rendering
                            renderItem={renderVideoItem}
                            keyExtractor={(item) => item.videoId} // Ensure unique keys
                        />
                    </View>
                </View>
            </View>
        </LinearGradient>
    );
};

// Styles for the components
const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        padding: 20,
        height: "100%",
    },
    searchBarContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 0.4,
        borderColor: "gray",
        borderRadius: 10,
        marginBottom: 30,
        marginRight: 20,
        marginLeft: 10,
        backgroundColor: "white",
    },
    searchIcon: {
        paddingLeft: 10,
    },
    searchBar: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginRight: 20,
    },
    searchButton: {
        backgroundColor: "#007bff",
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderTopRightRadius: 11,
        borderBottomRightRadius: 11,
    },
    searchButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    flatList: {
        marginRight: "2%",
        marginBottom: "30%",
    },
    videoItem: {
        marginBottom: 10, // Increased margin to create larger video container
        padding: 20, // Increased padding to create larger video container
        backgroundColor: "rgba(255,255,255,0.6)", // Light gray background color
        borderRadius: 10, // Rounded corners
        flexDirection: "row", // Align thumbnail and text horizontally
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
    },
    videoInfoContainer: {
        flex: 1, // Occupy remaining space
        flexDirection: "row", // Align thumbnail and text horizontally
    },
    thumbnail: {
        width: 100, // 30% of the container width
        height: 70, // Take full height
        marginRight: 15,
        borderRadius: 5, // Rounded corners
    },
    videoTextContainer: {
        flex: 1, // Occupy remaining space
        justifyContent: "center", // Center text vertically
        alignItems: "stretch",
    },
    videoTitle: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default SelfHelpVideo;
