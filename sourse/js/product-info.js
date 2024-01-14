const order = document.querySelector('.order');
const counters = order.querySelectorAll('.counter-button');

// получение чисел из строки
const getNumber = (value) => {
  const array = value.split('');
  const numbers = array.filter((item) => {
    const number = parseInt(item);

    return Boolean(number === 0 || number);
  });

  return numbers.join('');
};

const getCounterValue = (currentValue, counter) => {
  if (counter.classList.contains('counter-button--plus')) {
    return currentValue + 1;
  }

  return currentValue - 1;
};

const getTotalPrice = (totalPriceValue, counter) => {
  if (counter.classList.contains('counter-button--plus')) {
    return Number(getNumber(totalPriceValue)) + 129;
  }

  return Number(getNumber(totalPriceValue)) - 129;
};

if (counters) {
  counters.forEach(counter => {
    counter.addEventListener('click', e => {
      const target = e.target;
      const currentValue = Number(target.closest('.counter').querySelector('.count').innerHTML);
      const counterValue = getCounterValue(currentValue, counter);
      const totalPriceValue = target.closest('.order').querySelector('.order-price').innerHTML;
      const totalPrice = getTotalPrice(totalPriceValue, counter);

      if (counterValue <= 0) {
        target.closest('.counter').querySelector('.count').innerHTML = 1;

        return;
      }

      target.closest('.counter').querySelector('.count').innerHTML = counterValue;
      target.closest('.order').querySelector('.order-price').innerHTML = `$${totalPrice}`
    });
  });
}

// ____________ favorite ____________

const favorite = document.querySelectorAll('.favorite');

if (favorite) {
  favorite.forEach(element => {
    element.addEventListener('click', () => {
      element.classList.toggle('favorite-active');
    });
  });
}
