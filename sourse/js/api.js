import myModal from './modalError.js'
import { BASE_URL } from './constants.js';

const modalErrorText = document.getElementById('modal-text');
const getCardByIdController = new AbortController();

const getUrl = (url) => {
  const newUrl = new URL(url, BASE_URL);

  return newUrl.href;
}

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(
    modalErrorText.textContent = error,
    myModal.open('#myModal')
  )
});

const getCards = async () => {
  try {
    const response = await axios.get(getUrl('/cards'));

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

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

export { getCards, getCardById, getCardByIdController }
