import axios from "axios";

const getAllBlogs = async () => {
    try {
        const response = await axios.get(
            process.env.API_HOST + "/admin/getAllBlogs"
        );
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
const getBlogById = async (id) => {
    try {
        const response = await axios.get(
            process.env.API_HOST + "/admin/getBlog/" + id
        );
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
};
export { getAllBlogs, getBlogById };
