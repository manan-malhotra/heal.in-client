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
    widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { Entypo, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const circleWidth = width / 2;

const Breathing478 = () => {
    const move = useRef(new Animated.Value(0)).current;
    const textOpacity = useRef(new Animated.Value(0)).current; 
    const [isAnimating, setIsAnimating] = useState(false);
    const [timer, setTimer] = useState(0);
    const [timerRunning, setTimerRunning] = useState(true);
    const [timerText, setTimerText] = useState("00:00");
    const [selectedInterval, setSelectedInterval] = useState(0);
    const [showPicker, setShowPicker] = useState(true);
    const inhaleOpacity = useRef(new Animated.Value(1)).current;
    const holdOpacity = useRef(new Animated.Value(0)).current;
    const exhaleOpacity = useRef(new Animated.Value(0)).current;
    const [inhaleTimer, setInhaleTimer] = useState(4); 
    const [holdTimer, setHoldTimer] = useState(7);     
    const [exhaleTimer, setExhaleTimer] = useState(8); 

    const updateInhaleTimer = () => {
        setInhaleTimer((prevTimer) => prevTimer - 1);
    };

    const updateHoldTimer = () => {
        setHoldTimer((prevTimer) => prevTimer - 1);
    };

    const updateExhaleTimer = () => {
        setExhaleTimer((prevTimer) => prevTimer - 1);
    };

    useEffect(() => {
        const inhaleInterval = setInterval(() => {
            updateInhaleTimer();
        }, 1000);

        return () => clearInterval(inhaleInterval);
    }, [inhaleTimer]);

    useEffect(() => {
        const holdInterval = setInterval(() => {
            updateHoldTimer();
        }, 1000);

        return () => clearInterval(holdInterval);
    }, [holdTimer]);

    useEffect(() => {
        const exhaleInterval = setInterval(() => {
            updateExhaleTimer();
        }, 1000);

        return () => clearInterval(exhaleInterval);
    }, [exhaleTimer]);


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
                    Animated.timing(inhaleOpacity, {
                        toValue: 1,
                        duration: 1000, 
                        useNativeDriver: true,
                    }),
                    Animated.timing(move, {
                        toValue: 1,
                        duration: 4000, 
                        useNativeDriver: true,
                    }),
                ]),
                Animated.parallel([
                    Animated.timing(holdOpacity, {
                        toValue: 1,
                        duration: 1000, 
                        useNativeDriver: true,
                    }),
                    Animated.timing(inhaleOpacity, {
                        toValue: 0,
                        duration: 1000, 
                        useNativeDriver: true,
                    }),
                    Animated.delay(7000), 
                ]),
                Animated.parallel([
                    Animated.timing(exhaleOpacity, {
                        toValue: 1,
                        duration: 1000, 
                        useNativeDriver: true,
                    }),
                    Animated.timing(holdOpacity, {
                        toValue: 0,
                        duration: 1000, 
                        useNativeDriver: true,
                    }),
                    Animated.timing(move, {
                        toValue: 0,
                        duration: 8000, 
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
        inhaleOpacity.resetAnimation();
        holdOpacity.resetAnimation();
        exhaleOpacity.resetAnimation();
    };

    const handleIntervalChange = (value) => {
        const numVal = parseInt(value);
        setSelectedInterval(numVal);
        updateTimerText(numVal);
        setTimer(numVal);
        setShowPicker(false);
        startAnimation();
    };

    const translateRight = move.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 150],
    });

    const translateLeft = move.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 0],
    });

    const translateUp = move.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 150],
    });

    const translateDown = move.interpolate({
        inputRange: [0, 1],
        outputRange: [150, 0],
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
                            opacity: inhaleOpacity, 
                        }}
                    >
                        <Text style={styles.timerText}>Inhale</Text>
                    </Animated.View>
                    <Animated.View
                        style={{
                            width: circleWidth,
                            height: circleWidth,
                            ...StyleSheet.absoluteFill,
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: holdOpacity, 
                        }}
                    >
                        <Text style={styles.timerText}>Hold</Text>
                    </Animated.View>
                    <Animated.View
                        style={{
                            width: circleWidth,
                            height: circleWidth,
                            ...StyleSheet.absoluteFill,
                            alignItems: "center",
                            justifyContent: "center",
                            opacity: exhaleOpacity, 
                        }}
                    >
                        <Text style={styles.timerText}>Exhale</Text>
                    </Animated.View>
                    <>
                        <Animated.View
                            style={{
                                opacity: 0.8,
                                backgroundColor: "rgba(69,105,144,1)",
                                width: wp(50),
                                height: hp(25),
                                borderRadius: circleWidth/3,
                                ...StyleSheet.absoluteFill,
                                transform: [{
                                    rotateZ: move.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: ['-90deg', '90deg']
                                    })
                                }]
                            }}
                        />
                        <Animated.View
                            style={{
                                opacity: 0.8,
                                backgroundColor: "rgba(69,105,144,1)",
                                width: wp(10),
                                height: hp(5),
                                borderRadius: circleWidth,
                                ...StyleSheet.absoluteFill,
                                transform: [
                                    { translateY: -50 },
                                    { translateX: translateRight }
                                ]
                            }}
                        />
                        <Animated.View
                            style={{
                                opacity: 0.8,
                                backgroundColor: "rgba(69,105,144,1)",
                                width: wp(10),
                                height: hp(5),
                                borderRadius: circleWidth,
                                ...StyleSheet.absoluteFill,
                                transform: [
                                    { translateY: 195 },
                                    { translateX: translateLeft }
                                ]
                            }}
                        />
                        <Animated.View
                            style={{
                                opacity: 0.8,
                                backgroundColor: "rgba(69,105,144,1)",
                                width: wp(10),
                                height: hp(5),
                                borderRadius: circleWidth,
                                ...StyleSheet.absoluteFill,
                                transform: [
                                    { translateY: translateDown },
                                    { translateX: 200 }
                                ]
                            }}
                        />
                        <Animated.View
                            style={{
                                opacity: 0.8,
                                backgroundColor: "rgba(69,105,144,1)",
                                width: wp(10),
                                height: hp(5),
                                borderRadius: circleWidth,
                                ...StyleSheet.absoluteFill,
                                transform: [
                                    { translateY: translateUp },
                                    { translateX: -50 }
                                ]
                            }}
                        />
                    </>

                </View>
                <View style={{ paddingTop: "80%" }}>
                    <View style={styles.timerContainer}>
                        {timerRunning && !showPicker && (
                            <View style={styles.timerInnerContainer}>
                                <TouchableOpacity
                                    onPress={resetAnimation}
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

export default Breathing478;

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
        fontWeight: 'bold'
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