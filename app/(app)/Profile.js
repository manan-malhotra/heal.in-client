import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useAuth } from "../../context/authcontext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { MaterialCommunityIcons , Feather } from '@expo/vector-icons';

import bear from '../../assets/images/SvgIcons/bear.png'
import cactus from '../../assets/images/SvgIcons/cactus.png'
import sloth from '../../assets/images/SvgIcons/sloth.png'

const ProfileCardItem = ({ description, info, iconComponent, iconName }) => {
    const Icon = iconComponent === "Feather" ? Feather : MaterialCommunityIcons;
    const router = useRouter();
    return (
            <View style={styles.frontCardContainerRowContainer}>
                <Icon name={iconName} size={24} color="black" style={styles.icon} />
                <Text style={styles.frontCardContainerRowContainerDescriptionText}>{description}</Text>
                <Text style={styles.frontCardContainerRowContainerInfo}>{info}</Text>
            </View>
    );
};

const PrivacyLogoutSection = ({ onLogout }) => {
    return (
        <View style={[styles.frontCardContainer, {height: heightPercentageToDP(15)}]}>
            <ProfileCardItem description="Privacy Policy" iconComponent="Feather" iconName="shield" />
            <View style ={styles.verticalLine} />
            <TouchableOpacity onPress={onLogout} style={styles.frontCardContainerRowContainer}>
                <MaterialCommunityIcons name="logout" size={24} color="red" style={styles.icon} />
                <Text style={[styles.frontCardContainerRowContainerDescriptionText , {color: 'red'}]}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

const Profile = () => {
    const router = useRouter();
    const { logout } = useAuth();
    const item = useLocalSearchParams();

    const [firstName, setFirstName] = useState("Default");
    const [lastName, setLastName] = useState("User");
    const [email, setEmail] = useState("username@email.com");
    const [gender, setGender] = useState("Male");
    const [age, setAge] = useState("200");
    const [contact, setContact] = useState("1234567890");
    const [doctor, setDoctor] = useState("false")
    
    const getUserData = async () => {
        try {
            const firstName = await AsyncStorage.getItem("firstName");
            const lastName = await AsyncStorage.getItem("lastName");
            const email = await AsyncStorage.getItem("email");
            const gender = await AsyncStorage.getItem("gender");
            const age = await AsyncStorage.getItem("age");
            const contact = await AsyncStorage.getItem("contact");
            const doctor = await AsyncStorage.getItem("doctorBoolean")
            setDoctor(doctor);
            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setGender(gender);
            setAge(age);
            setContact(contact);
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        getUserData();
    }, []);

    const handleLogout = () => {
        logout();
    };

    return (
        <View style={styles.blackContainer}>
            <View style={styles.whiteBackContainer}>
                <View style={styles.container}>
                    <View style={styles.secondFrontCardContainer}>
                        <View style={styles.firstFrontCardContainerRow}>
                            <View style={styles.firstFrontCardContainerProfileIconContainer}>
                                <Image source={bear} style={styles.firstFrontCardContainerProfileIcon}/>
                            </View>
                            <View style={styles.firstFrontCardContainerUserNameContainer}>
                                <Text style={styles.firstFrontCardInnerContainerUserName}> Jay Rathod </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.frontCardContainer}>
                        <ProfileCardItem description="Mail" info={email} iconComponent="Feather" iconName="mail" />
                        <View style ={styles.verticalLine} />
                        <ProfileCardItem description="Phone" info={contact} iconComponent="Feather" iconName="phone" />
                        <View style ={styles.verticalLine} />
                        <ProfileCardItem description="Age" info={age} iconComponent="Feather" iconName="calendar" />
                        <View style ={styles.verticalLine} />
                        <ProfileCardItem description="Gender" info={gender} iconComponent="MaterialCommunityIcons" iconName="gender-male-female" />
                    </View>
                    <PrivacyLogoutSection onLogout={handleLogout} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    blackContainer:{
        backgroundColor: "#456990",
        flex: 1,
    },
    whiteBackContainer: {
        top: heightPercentageToDP(20),
        backgroundColor: "#f9fcf9",
        borderRadius: widthPercentageToDP(8),
        flex: 1
    },
    container: {
        top:heightPercentageToDP(-4.0),
    },
    firstFrontCardContainer: {
        position: 'absolute',
        justifyContent: 'center',
        top: heightPercentageToDP(8),
        alignSelf: 'center',
        height: heightPercentageToDP(8),
        width: widthPercentageToDP(92),
        padding: 5
    },
    firstFrontCardContainerRow: {
        flexDirection: 'row',
        padding: 3,
        flex: 1
    },
    firstFrontCardContainerProfileIconContainer:{
        width: widthPercentageToDP(14),
        justifyContent: 'center'
    },
    firstFrontCardContainerProfileIcon: {
        fontSize: 16,
        alignSelf: 'center',
        width:  widthPercentageToDP(10),
        height: heightPercentageToDP(5)
    },
    firstFrontCardContainerUserNameContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    firstFrontCardInnerContainerUserName: {
        color: 'black',
        fontSize: 18,
    },
    secondFrontCardContainer:{
        position: 'relative',
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5,
        marginLeft: widthPercentageToDP(10),
        marginRight: widthPercentageToDP(10),
        padding: widthPercentageToDP(2)
    },
    frontCardContainer: {
        borderRadius: 20,
        shadowColor: 'black',
        backgroundColor: 'white',
        height: heightPercentageToDP(30),
        marginTop: heightPercentageToDP(5),
        marginLeft: widthPercentageToDP(10),
        marginRight: widthPercentageToDP(10),
        paddingTop: heightPercentageToDP(1),
        paddingBottom: heightPercentageToDP(1),
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        elevation: 5,
    },
    frontCardContainerRowContainer: {
        flexDirection: 'row',
        width: '100%',
        height: heightPercentageToDP(4.5),
        padding: widthPercentageToDP(1),
        justifyContent: 'space-between',
    },
    frontCardContainerRowContainerDescriptionText: {
        fontSize: 16,
        flex:1,
        color: 'gray',
        textAlignVertical: 'center',
        marginLeft: widthPercentageToDP(1),
        marginRight: widthPercentageToDP(1)
        
    },
    frontCardContainerRowContainerInfo: {
        height: '100%',
        alignSelf: 'center',
        color: 'rgba(0,0,0,0.8)',
        marginLeft: widthPercentageToDP(1),
        marginRight: widthPercentageToDP(1),
        fontSize: 16,
        textAlignVertical: 'center'
    },
    icon: {
        marginTop: heightPercentageToDP(0.2),
    },
    verticalLine:{
        backgroundColor: "gray",
        opacity: 0.2,
        height: heightPercentageToDP(0.1),
        marginVertical: heightPercentageToDP(1.1)
    },
});

export default Profile;
