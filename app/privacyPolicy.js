import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";

export default function PrivacyPolicy() {
  return (
    <WebView
      style={styles.container}
      source={{
        uri: "https://www.termsfeed.com/live/8af1ab35-7608-47a0-8c98-18148beb4373",
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});
