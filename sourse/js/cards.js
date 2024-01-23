import { getCards } from './api/get-cards.js';
import { CurrencyMap } from './constants.js';
import { toNormalizeValue } from './utils/normalize-value.js';

const cardTemplate = document.querySelector('#card').content;
const container = document.querySelector('.cards');
const data = await getCards();
const cards = data.content;
const input = document.querySelector('#input');

const renderCards = (data) => {
  container.innerHTML = '';

  const fragment = document.createDocumentFragment();

  data.forEach((element) => {
    const card = createCard(element);
    fragment.append(card);
  });
  container.append(fragment);
};

input.addEventListener('change', ({ target }) => {
  const inputValue = target.value;
  const normalizedValue = toNormalizeValue(inputValue);

  const items = cards.filter((card) => {
    const normalizedName = toNormalizeValue(card.name);

    return normalizedName.includes(normalizedValue);
  });
  renderCards(items);
});

const createCard = (card) => {
  const { id, name, description, like, picture, price } = card;
  const template = cardTemplate.cloneNode(true);
  const cardContainer = template.querySelector('.card');

  const goToCardHandler = () => {
    const appendId = () => {
      const cardId = new URLSearchParams();
      cardId.append('id', id);
      window.location.href = `product-info.html?${cardId}`;
    };

    appendId();
  };

  cardContainer.addEventListener('click', goToCardHandler, { once: true });

  cardContainer.addEventListener('keyup', ({ code }) => {
    if (code === 'Enter') {
      goToCardHandler();
    }
  }, { once: true });

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
