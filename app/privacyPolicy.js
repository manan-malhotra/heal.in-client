import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StyleSheet, View } from "react-native";
import Header from "../components/Header";

export default function PrivacyPolicy() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Privacy Policy" />
      <WebView
        style={styles.container}
        source={{
          uri: "https://www.termsfeed.com/live/8af1ab35-7608-47a0-8c98-18148beb4373",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
