/** External */
import axios from "axios";

/** Constants */
import { BACKEND_URI } from "/constants";

export const postAuthToBackend = async (token, userData) => {
  try {
    const { data } = await axios.post(`${BACKEND_URI}/api/login`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error during API call:", error);
    throw error;
  }
};
