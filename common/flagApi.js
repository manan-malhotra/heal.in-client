import axios from "axios";
const getFlags = async (type) => {
    try {
        if (type.toLowerCase() === "blog") {
            const response = await axios.get(
                process.env.API_HOST + "/flag/blogs/getAllFlaggedBlogs"
            );
            return response.data;
        } else {
            const response = await axios.get(
                process.env.API_HOST + "/flag/publicQNA/getAllFlaggedPublicQNA"
            );
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

const deleteAPI = async (type, id) => {
    try {
        if (type.toLowerCase() === "blog") {
            const response = await axios.delete(
                process.env.API_HOST + "/admin/deleteBlogs/" + id
            );
            return response.status;
        } else {
            const response = await axios.delete(
                process.env.API_HOST + "/api/user/deleteQuestion/" + id
            );
            return response.status;
        }
    } catch (error) {
        console.log(error);
    }
};

export { getFlags, deleteAPI };
