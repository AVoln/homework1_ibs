import { getCards, getCardById } from './api.js';

const CurrencyMap = {
  USD: '$'
};

const cardTemplate = document.querySelector('#card').content;
const container = document.querySelector('.cards');
const data = await getCards();
const cards = data.content;
const input = document.querySelector('#input');

const renderCards = (data) => {
  container.querySelectorAll('.card').forEach((element) => {
    element.remove();
  });

  const fragment = document.createDocumentFragment();

  data.forEach(element => {
    const card = createCard(element);
    fragment.append(card);
  });
  container.append(fragment);
};

input.addEventListener('change', (e) => {
  const inputValue = e.target.value;
  const items = cards.filter(card => {

    return card.name.trim().toLowerCase().includes(inputValue.trim().toLowerCase());
  });
  renderCards(items);
});

const createCard = (card) => {
  const { id, name, description, like, picture, price } = card;
  const template = cardTemplate.cloneNode(true);
  const cardContainer = template.querySelector('.card');

  cardContainer.addEventListener('click', (e) => {
    getCardById(id).then(response => {
      localStorage.setItem('card', JSON.stringify(response.content));
      window.location.href = './product-info.html';
    })
  });

  cardContainer.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
      getCardById(id).then(response => {
        localStorage.setItem('card', JSON.stringify(response.content));
        window.location.href = './product-info.html';
      });
    }
  });

  cardContainer.id = id;
  template.querySelector('.card-name').textContent = name;
  template.querySelector('.card-description').textContent = description;
  template.querySelector('.card-img').src = `http://localhost:3006${picture.path}`;
  template.querySelector('.card-img').alt = picture.alt;
  template.querySelector('.card-price').textContent = `${CurrencyMap[price.currency]}${price.value}`;

  if (like) {
    template.querySelector('.card-favorite').classList.toggle('favorite-active');
  }

  return template;
};

renderCards(cards);
