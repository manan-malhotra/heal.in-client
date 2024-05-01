import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Text, View, StyleSheet } from "react-native";
import { theme } from "../constants/Colors";

const GenderDropDown = ({ value, onChangeText }) => {
  const genders = [{ title: "Male" }, { title: "Female" }, { title: "Other" }];
  return (
    <SelectDropdown
      data={genders}
      onSelect={(selectedItem, index) => {
        onChangeText(selectedItem.title);
      }}
      renderButton={(selectedItem, isOpened) => {
        return (
          <View style={styles.dropdownButtonStyle}>
            {selectedItem && (
              <Icon
                name={selectedItem.icon}
                style={styles.dropdownButtonIconStyle}
              />
            )}
            {selectedItem && selectedItem.title ? (
              <Text style={styles.selectedItemText}>
                {selectedItem && selectedItem.title}
              </Text>
            ) : (
              <Text style={styles.dropdownButtonTxtStyle}>Gender</Text>
            )}

            <Icon
              name={isOpened ? "chevron-up" : "chevron-down"}
              style={styles.dropdownButtonArrowStyle}
            />
          </View>
        );
      }}
      renderItem={(item, index, isSelected) => {
        return (
          <View
            style={{
              ...styles.dropdownItemStyle,
              ...(isSelected && { backgroundColor: "#D2D9DF" }),
            }}
          >
            <Icon name={item.icon} style={styles.dropdownItemIconStyle} />
            <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
          </View>
        );
      }}
      showsVerticalScrollIndicator={false}
      dropdownStyle={styles.dropdownMenuStyle}
    />
  );
};

export default GenderDropDown;

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: 150,
    height: 41,
    backgroundColor: theme.colors.background,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
    color: "#ADADAD",
  },
  selectedItemText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
    color: "#000000",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: theme.colors.background,
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#000000",
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});
