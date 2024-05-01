import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { theme } from "../../../constants/Colors";
import Icon from "react-native-vector-icons/Feather";
import { deleteAPI, getFlags } from "../../../common/flagApi";

const Reviews = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    getFlags(type).then((res) => {
      setData(res);
    });
  };
  const { type } = useLocalSearchParams();
  const [viewMore, setViewMore] = useState([]);
  const handleViewMore = (id) => {
    if (viewMore.includes(id)) {
      setViewMore((prevViewMore) =>
        prevViewMore.filter((viewId) => viewId !== id)
      );
      return;
    }
    setViewMore((prevViewMore) => [...prevViewMore, id]);
  };
  const handleDelete = async (id) => {
    Alert.alert("Are you sure?", "This action cannot be undone.", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          try {
            const response = await deleteAPI(type, id);
            if (response === 200) {
              getData();
            }
          } catch (error) {}
        },
        style: "destructive",
      },
    ]);
  };
  return (
    <View style={styles.body}>
      <ScrollView>
        {data.map((flagItem) => (
          <View style={styles.mainCard} key={flagItem.id}>
            <View style={styles.headingCard}>
              <View style={styles.titleCard}>
                <Text style={styles.title}>{flagItem.title}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteCard}
                onPress={() => {
                  handleDelete(flagItem.id);
                }}
              >
                <Icon
                  name="trash"
                  size={20}
                  style={{ color: theme.colors.error }}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.authorCard}>
              <Text style={styles.author}>{flagItem.author}</Text>
            </View>
            {flagItem.description.length != 0 && (
              <>
                <View style={styles.descriptionCard}>
                  <Text style={styles.description}>
                    {flagItem.description.length > 100 &&
                    !viewMore.includes(flagItem.id)
                      ? flagItem.description.substring(0, 100) + "..."
                      : flagItem.description}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    handleViewMore(flagItem.id);
                  }}
                  style={styles.viewMoreCard}
                >
                  <Text style={styles.viewMore}>
                    {flagItem.description.length > 100
                      ? viewMore.includes(flagItem.id)
                        ? "View Less"
                        : "View More"
                      : ""}
                  </Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.flagCard}>
              {flagItem.spamCount > 0 && (
                <View style={styles.flagCount}>
                  <Text>Spam {flagItem.spamCount}</Text>
                </View>
              )}
              {flagItem.irrelevantCount > 0 && (
                <View style={styles.flagCount}>
                  <Text>Irrelevancy {flagItem.irrelevantCount}</Text>
                </View>
              )}
              {flagItem.hateCount > 0 && (
                <View style={styles.flagCount}>
                  <Text>Hate {flagItem.hateCount}</Text>
                </View>
              )}
              {flagItem.otherCount > 0 && (
                <View style={styles.flagCount}>
                  <Text>Other {flagItem.otherCount}</Text>
                </View>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(7),
  },
  mainCard: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: theme.colors.button,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    marginBottom: heightPercentageToDP(5),
  },
  headingCard: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 20,
  },
  titleCard: {
    width: "85%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors.button,
  },
  deleteCard: {
    marginLeft: "auto",
    width: "8%",
    justifyContent: "center",
  },
  authorCard: {
    flexDirection: "row",
    paddingLeft: 10,
  },
  author: {
    fontSize: 15,
    fontWeight: "bold",
    color: theme.colors.primary,
    paddingBottom: 5,
  },
  descriptionCard: {
    padding: 10,
    paddingBottom: 5,
  },
  description: {
    fontSize: 15,
    fontWeight: "500",
    color: theme.colors.text,
  },
  viewMoreCard: {
    padding: 10,
    paddingTop: 0,
  },
  viewMore: {
    fontSize: 15,
    fontWeight: "500",
    color: theme.colors.primary,
  },
  flagCard: {
    flexDirection: "row",
    padding: 10,
    paddingTop: 0,
  },
  flagCount: {
    backgroundColor: "#D9D9D9",
    borderRadius: 5,
    padding: 5,
    marginRight: widthPercentageToDP(2),
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
