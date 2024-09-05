/** External */
import axios from "axios";

/** Constants */
import { BACKEND_URI } from "/constants";

export const postAuthToBackend = async (token, userData) => {
  const { data } = await axios.post(`${BACKEND_URI}/api/login`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
