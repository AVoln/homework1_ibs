import { getCards } from './api.js';

const CurrencyMap = {
  USD: '$'
}

const cardTemplate = document.querySelector('#card').content;
const container = document.querySelector('.cards');
const data = await getCards();
const cards = data.content;

const createCard = (card) => {
  const { name, description, like, price, picture, id } = card;
  const template = cardTemplate.cloneNode(true);
  const cardContainer = template.querySelector('.card');

  cardContainer.addEventListener('click', () => {
    window.location.href = './product-info.html';
  });

  cardContainer.id = id;
  template.querySelector('.card-img').src = `http://localhost:3006/${picture.path}`;
  template.querySelector('.card-img').alt = picture.alt;
  template.querySelector('.card-name').textContent = name;
  template.querySelector('.card-description').textContent = description;
  template.querySelector('.card-price').textContent = `${CurrencyMap[price.currency]}${price.value}`;
  if (like) {
    template.querySelector('.card-favorite').classList.toggle('favorite-active');
  }

  return template;
};

const renderCards = (data) => {
  const fragment = document.createDocumentFragment();

  data.forEach(element => {
    const card = createCard(element);
    fragment.append(card)
  });
  container.append(fragment)
};

renderCards(cards);
