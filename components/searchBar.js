import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { theme } from "../constants/Colors";
import Icon from "react-native-vector-icons/AntDesign";

const SearchBar = ({ handleSearch, searchText, type }) => {
  return (
    <View style={styles.searchBar}>
      <View style={styles.searchBarIcon}>
        <Icon
          name="search1"
          size={20}
          style={{ color: theme.colors.primary }}
        />
      </View>
      <View style={styles.searchBarInput}>
        <TextInput
          style={styles.searchBarInputText}
          placeholder={typeof type == "undefined" ? "Search" : "Search " + type}
          placeholderTextColor={theme.colors.primary}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    width: "75%",
    height: 50,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
    marginVertical: 10,
    shadowColor: "#000",
    borderColor: "rgba(69,105,144,0.8)",
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    flexDirection: "row",
  },
  searchBarIcon: {
    width: "15%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarInput: {
    width: "85%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  searchBarInputText: {
    width: "100%",
    height: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    color: theme.colors.primary,
  },
});
