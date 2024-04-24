import SelectDropdown from "react-native-select-dropdown";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "../../../../constants/Colors";
import React, { useRef, useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    TouchableOpacity,
} from "react-native";
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const circleWidth = width / 2;

const BreathingCircle = () => {
    const move = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(1)).current;
    const [isAnimating, setIsAnimating] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(true);
    const [timerText, setTimerText] = useState("00:00");
    const [selectedInterval, setSelectedInterval] = useState(0);
    const [showPicker, setShowPicker] = useState(true);

    useEffect(() => {
        if (timerRunning && timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
                updateTimerText(timer - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        } else {
            resetAnimation();
            setShowPicker(true);
        }
    }, [timerRunning, timer, selectedInterval]);

    const updateTimerText = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        const minutesStr = String(minutes).padStart(2, "0");
        const secondsStr = String(seconds).padStart(2, "0");
        setTimerText(`${String(minutesStr)}:${String(secondsStr)}`);
    };

    const startAnimation = () => {
        setIsAnimating(true);
        setTimerRunning(true);
        updateTimerText(selectedInterval);
        Animated.loop(
            Animated.sequence([
                Animated.parallel([
                    Animated.timing(textOpacity, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(move, {
                        toValue: 1,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(textOpacity, {
                        delay: 100,
                        toValue: 0,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(move, {
                        delay: 1000,
                        toValue: 0,
                        duration: 2000,
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start(() => setIsAnimating(true));
    };

    const resetAnimation = () => {
        setIsAnimating(false);
        setTimerRunning(false);
        move.resetAnimation();
        textOpacity.resetAnimation();
    };

    const handleIntervalChange = (value) => {
        const numVal = parseInt(value);
        console.log(numVal);
        setSelectedInterval(numVal);
        updateTimerText(numVal);
        setTimer(numVal);
        setShowPicker(false);
        startAnimation();
    };

    const handleReset = () => {
        resetAnimation();
        setShowPicker(true);
        setTimer(0);
    };

    const translate = move.interpolate({
        inputRange: [0, 1],
        outputRange: [0, circleWidth/6],
    });

    const exhale = textOpacity.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });

    return (
        <>
            <View
                style={{
                    backgroundColor: "white",
                    flex: 1,
                    justifyContent: "center",
                }}
            >
                <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                >
                    <Text
                        style={{
                            fontSize: 30,
                            fontWeight: "600",
                            color: "black",
                        }}
                    >
                        Deep Meditation to relax
                    </Text>
                    <Text
                        style={{
                            fontSize: 22,
                            marginTop: hp(2),
                            color: "#909090",
                        }}
                    >
                        Start Meditation of mind
                    </Text>
                </View>
                <View style={styles.container}>
                    <Animated.View
                        style={{
                            width: circleWidth,
                            height: circleWidth,
                            ...StyleSheet.absoluteFill,
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: textOpacity,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                            }}
                        >
                            Inhale
                        </Text>
                    </Animated.View>
                    <Animated.View
                        style={{
                            width: circleWidth,
                            height: circleWidth,
                            ...StyleSheet.absoluteFill,
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: exhale,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 20,
                                fontWeight: "bold",
                            }}
                        >
                            Exhale
                        </Text>
                    </Animated.View>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map((item) => {
                    const rotation = move.interpolate({
                    inputRange: [0, 1],
                    outputRange: [`${item * 45}deg`, `${item * 45 + 180}deg`],
                    });
                        return (
                            <Animated.View
                                key={item}
                                style={{
                                    opacity: 0.28,
                                    backgroundColor: "rgba(69,105,144,0.7)",
                                    width: circleWidth,
                                    height: circleWidth,
                                    borderRadius: circleWidth / 2,
                                    ...StyleSheet.absoluteFill,
                                    transform: [
                                        {
                                            rotateZ: rotation,
                                        },
                                        { translateX: translate },
                                        { translateY: translate },
                                    ],
                                }}
                            ></Animated.View>
                        );
                    })}
                </View>
                <View style={{ paddingTop: "80%" }}>
                    <View style={styles.timerContainer}>
                        {timerRunning && !showPicker && (
                            <View style={styles.timerInnerContainer}>
                                <TouchableOpacity
                                    onPress={handleReset}
                                    style={styles.resetContainer}
                                >
                                    <Feather
                                        name="stop-circle"
                                        size={30}
                                        color="black"
                                        style={{ justifyContent: "center" }}
                                    />
                                </TouchableOpacity>
                                <Text style={styles.timerText}>
                                    {timerText}
                                </Text>
                            </View>
                        )}
                        {showPicker && (
                            <TimerInput
                                onIntervalChange={handleIntervalChange}
                            />
                        )}
                    </View>
                </View>
            </View>
        </>
    );
};

export default BreathingCircle;

const TimerInput = ({ onIntervalChange }) => {
    const intervals = [
        { title: "30", unit: "" },
        { title: "45", unit: "" },
        { title: "60", unit: "" },
        { title: "120", unit: "" },
        { title: "180", unit: "" },
    ];

    return (
        <SelectDropdown
            data={intervals}
            onSelect={(selectedItem, index) => {
                onIntervalChange(selectedItem.title);
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
                            <Text style={styles.dropdownButtonTxtStyle}>
                                Select Time
                            </Text>
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
                        <Icon
                            name={item.icon}
                            style={styles.dropdownItemIconStyle}
                        />
                        <Text style={styles.dropdownItemTxtStyle}>
                            {item.title + " " + item.unit}
                        </Text>
                    </View>
                );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: hp(14),
        left: wp(24),
    },
    timerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        padding: wp(1),
        alignItems: "center",
        width: wp(45),
        alignSelf: "center",
    },
    timerInnerContainer: {
        width: 170,
        height: 41,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    resetContainer: {
        marginRight: wp(4),
    },
    timerText: {
        fontSize: 23,
        textAlign: "center",
    },
    dropdownButtonStyle: {
        width: 170,
        height: 41,
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