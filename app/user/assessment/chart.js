import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
    BarChart,
    LineChart,
    PieChart,
    PopulationPyramid,
} from "react-native-gifted-charts";

// ...
const data = [
    { value: 30 },
    { value: 8, labelComponent: () => customLabel("Oct") },
    { value: 28 },
    { value: 24 },
    { value: 22 },
    { value: 16 },
    { value: 16, labelComponent: () => customLabel("Nov") },
    { value: 21 },
    { value: 18 },
    { value: 10 },
    { value: 8, labelComponent: () => customLabel("Dec") },
];
const customLabel = (val) => {
    return (
        <View>
            <Text style={{ color: "black", fontWeight: "bold" }}>{val}</Text>
        </View>
    );
};
const Chart = () => {
    return (
        <View style={{ flex: 1, width: "90%", alignSelf: "center" }}>
            <Text>Recent Depression Test Results Over Time</Text>
            <View style={{}}>
                <LineChart
                    data={data}
                    areaChart
                    width={Dimensions.get("window").width * 0.75}
                    height={Dimensions.get("window").height * 0.5}
                    // adjustToWidth
                    isAnimated={true}
                    initialSpacing={0}
                    curved
                    dataPointsColor1="#114b5f"
                    startFillColor1="#028090"
                    startOpacity={0.8}
                    endOpacity={0.1}
                    // hideDataPoints
                    // backgroundColor="skyblue"
                    hideYAxisText
                />
            </View>
        </View>
    );
};

export default Chart;

const styles = StyleSheet.create({});
