import myModal from './modalError.js'

const ROOT_URL = new URL('http://localhost:3006');
const modalErrorText = document.querySelector('.modal-error');

// const getCardsAxios = axios.create({
//   baseURL: `${ROOT_URL}cards`
// })

// const getCardByIdAxios = axios.create({
//   baseURL: `${ROOT_URL}cards/${id}`
// })

const getCards = async () => {
  try {
    const response = await axios.get(`${ROOT_URL}cards`);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

const getCardById = async (id) => {
  try {
    const response = await axios.get(`${ROOT_URL}cards/${id}`);

    return response.data;
  } catch (e) {
    console.error(e);
  }
};

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(
    modalErrorText.innerHTML = error,
    myModal.open('#myModal')
  )
})

export { getCards, getCardById }
