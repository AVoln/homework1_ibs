import { getCardById } from "./api/get-card.js";
import { CurrencyMap } from "./constants.js";
import { renderCounter } from "./order.js";

const cardIdTemplate = document.querySelector('#cardId').content;
const container = document.querySelector('.product-container');
const queryString = window.location.search;
const params = new URLSearchParams(queryString);

const id = params.get("id");

const createCardInfo = (card) => {
  const { id, name, description, info, details, like, picture, price } = card;
  const template = cardIdTemplate.cloneNode(true);

  container.id = id;
  template.querySelector('.product-title').textContent = name;
  template.querySelector('.product-description').textContent = description;
  template.querySelector('.product-info').textContent = info;
  template.querySelector('.product-details').textContent = details;
  template.querySelector('.product-img').src = `http://localhost:3006${picture.path}`;
  template.querySelector('.product-img').alt = picture.alt;
  template.querySelector('.order-price').textContent = `${CurrencyMap[price.currency]}${price.value}`;

  if (like) {
    template.querySelector('.card-favorite').classList.toggle('favorite-active');
  }

  return template;
};

const renderCardInfo = (data) => {
  const fragment = document.createDocumentFragment();
  const card = createCardInfo(data);
  fragment.append(card);
  container.append(fragment);
};

getCardById(id).then(({ content }) => {
  renderCardInfo(content)
  renderCounter(content)
})
