import axios from "axios";
const sentimentScore = async (text) => {
    const json = {
        content: text,
    };
    try {
        const response = await axios.post(process.env.SENTIMENT_API, json);
        return response.data.sentiment;
    } catch (error) {
        console.log(error);
        return 0;
    }
};

export { sentimentScore };
