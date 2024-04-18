import axios from "axios";

const sendOTP = async (phoneNumber) => {
    console.log(phoneNumber)
    const json = {phoneNumber}
    try {
        const response = await axios.post(process.env.TWILIO_API_HOST+"/send-otp", {
            phoneNumber: phoneNumber
        });
        return response.data;
    } catch (error) {
        return error;
    }
};

const verifyOTP = async (phoneNumber, code) => {
    try {
        const response = await axios.post(process.env.TWILIO_API_HOST+"/verify-otp", {
            phoneNumber: phoneNumber,
            code: code
        });
        return response.data;
    } catch (error) {
        return error;
    }
}


export { sendOTP, verifyOTP };

