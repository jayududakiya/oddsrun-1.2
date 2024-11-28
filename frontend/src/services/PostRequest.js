import axios from "axios";
import { API_URL } from "../config/Api_Url";
import { toast } from "react-toastify";

const PostRequest = async (path, data = {}) => {
  try {
    const header = {
      "content-type": "application/json",
    };

    const response = await axios.post(`${API_URL}${path}`, data, {
      headers: header,
      crossDomain: true,
    });

    const responseData = response.data;

    if (responseData.code == 200) {
      return responseData.data;
    } else {
      toast.error(responseData.data);
    }
  } catch (error) {
    toast.error(error);
  }
};

export default PostRequest;
