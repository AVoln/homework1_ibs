const order = document.querySelector('.order');
const counters = order.querySelectorAll('.counter-button');
const data = JSON.parse(localStorage.getItem('card'));

const createPrice = ({ price }) => {
  const totalPrice = order.querySelector('.order-price');
  let totalPriceValue = totalPrice.textContent;

  totalPriceValue = price.value;

  return totalPriceValue;
}

const getCounterValue = (countValue, counter) => {
  if (counter.classList.contains('counter-button--plus')) {
    return countValue + 1;
  }

  return countValue - 1;
};

const getTotalPrice = (totalPriceValue, counter, counterValue) => {
  if (counter.classList.contains('counter-button--plus')) {
    return totalPriceValue * counterValue;
  }

  return totalPriceValue * counterValue;
};

if (counters) {
  counters.forEach((counter) => {
    counter.addEventListener('click', ({ target }) => {
      const count = target.closest('.counter').querySelector('.count').textContent;
      let countValue = Number(count);
      let counterValue = getCounterValue(countValue, counter);
      let totalPriceValue = createPrice(data);
      let totalPrice = getTotalPrice(totalPriceValue, counter, counterValue);

      if (countValue <= 0) {
        return countValue = 1;
      }

      if (totalPrice <= 0) {
        return totalPrice = 129;
      }

      target.closest('.counter').querySelector('.count').textContent = counterValue;
      target.closest('.order').querySelector('.order-price').textContent = `$${totalPrice}`;
    });
  });
}
