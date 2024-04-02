import { Text, View } from "react-native";
import { theme } from "../constants/Colors";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const Title = ({ title }) => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        height: hp(5),
        justifyContent: "center",
        paddingLeft: wp(9),
        paddingBottom: hp(1),
      }}
    >
      <Text
        style={{
          color: theme.colors.text,
          fontWeight: "bold",
          fontSize: hp(3),
        }}
      >
        {title}
      </Text>
    </View>
  );
};

export default Title;
