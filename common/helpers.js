import AsyncStorage from "@react-native-async-storage/async-storage";

const formatDate = (inputDate) => {
    const originalDate = new Date(inputDate);
    const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const month = monthNames[originalDate.getMonth()];
    const day = originalDate.getDate();
    const year = originalDate.getFullYear();
    const formattedDate = `${month} ${day}, ${year}`;
    return formattedDate;
};

const getFromStorage = async (key) => {
    const value = await AsyncStorage.getItem(key);
    return value;
};
export { formatDate, getFromStorage };
