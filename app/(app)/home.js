import { View } from "react-native";
import TabNavigation from "../Navigation";
import AdminDashboard from "../adminDashboard";

export default function home() {
    return (
        <View className="h-full">
            <TabNavigation />
        </View>
    );
}
