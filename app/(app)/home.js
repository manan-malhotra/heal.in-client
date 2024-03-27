import { View } from "react-native";
import UserDashboardNavigation from "../userDashboardNavigation";
import AdminDashboardNavigation from "./adminDashboardNavigation";
import ResponderDashboardNavigation from "./responderDashboardNavigation";
import DoctorDashboardNavigation from "./doctorDashboardNavigation";

export default function home() {
    return (
        <View className="h-full">
            <UserDashboardNavigation />
        </View>
    );
}
