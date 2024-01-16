const ROOT_URL = new URL('http://localhost:3006');

const getCards = async () => {
  try {
    const response = await fetch(`${ROOT_URL}cards`);
    const data = response.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};

const getCardById = async (id) => {
  try {
    const response = await fetch(`${ROOT_URL}cards/${id}`);
    const data = response.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};

export { getCards, getCardById }
