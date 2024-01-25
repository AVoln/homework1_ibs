import { getUrl } from "../utils/get-url.js";

export const getCards = async () => {
  try {
    const response = await axios.get(getUrl('/cards'));

    return response.data;
  } catch (e) {
    console.error(e);
  }
};