import { getUrl } from "../utils/get-url.js";

const getCardByIdController = new AbortController();

const getCardById = async (id) => {
  try {
    const response = await axios.get(getUrl(`/cards/${id}`), {
      signal: getCardByIdController.signal,
    });

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export { getCardById, getCardByIdController };
