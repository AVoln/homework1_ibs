const url = new URL('http://localhost:3006/item');

const getCards = async () => {
  try {
    const response = await fetch(url);
    const data = response.json();

    return data;
  } catch (e) {
    console.error(e);
  }
};

export { getCards }
