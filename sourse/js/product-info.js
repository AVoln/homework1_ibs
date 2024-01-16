const CurrencyMap = {
  USD: '$'
}

const cardIdTemplate = document.querySelector('#cardId').content;
const container = document.querySelector('.product-container');
const data = JSON.parse(localStorage.getItem('card'));

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
  template.querySelector('.count').textContent = `${CurrencyMap[price.currency]}${price.value}`;

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

renderCardInfo(data);


// const order = document.querySelector('.order');
// const counters = order.querySelectorAll('.counter-button');

// // получение чисел из строки
// const getNumber = (value) => {
//   const array = value.split('');
//   const numbers = array.filter((item) => {
//     const number = parseInt(item);

//     return Boolean(number === 0 || number);
//   });

//   return numbers.join('');
// };

// const getCounterValue = (currentValue, counter) => {
//   if (counter.classList.contains('counter-button--plus')) {
//     return currentValue + 1;
//   }

//   return currentValue - 1;
// };

// const getTotalPrice = (totalPriceValue, counter) => {
//   if (counter.classList.contains('counter-button--plus')) {
//     return Number(getNumber(totalPriceValue)) + 129;
//   }

//   return Number(getNumber(totalPriceValue)) - 129;
// };

// if (counters) {
//   counters.forEach(counter => {
//     counter.addEventListener('click', e => {
//       const target = e.target;
//       const currentValue = Number(target.closest('.counter').querySelector('.count').innerHTML);
//       const counterValue = getCounterValue(currentValue, counter);
//       const totalPriceValue = target.closest('.order').querySelector('.order-price').innerHTML;
//       const totalPrice = getTotalPrice(totalPriceValue, counter);

//       if (counterValue <= 0) {
//         target.closest('.counter').querySelector('.count').innerHTML = 1;

//         return;
//       }

//       target.closest('.counter').querySelector('.count').innerHTML = counterValue;
//       target.closest('.order').querySelector('.order-price').innerHTML = `$${totalPrice}`
//     });
//   });
// }

