import { View } from "react-native";
import TabNavigation from "../Navigation";
import AdminDashboardNavigation from "../adminDashboardNavigation";
import ReviewScreen from "../responderDashboard";
export default function home() {
    return (
        <View className="h-full">
            <TabNavigation />
        </View>
    );
}
