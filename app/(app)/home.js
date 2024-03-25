import { View } from "react-native";
import TabNavigation from "../Navigation";
import AdminDashboardNavigation from "../adminDashboardNavigation";

export default function home() {
    return (
        <View className="h-full">
            <TabNavigation />
        </View>
    );
}
