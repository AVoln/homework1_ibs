import { getCounterValue } from "./counter-value.js";
import { createPrice } from "./create-price.js";
import { getTotalPrice } from "./total-price.js";

export const renderCounter = (data) => {
  const order = document.querySelector('.order');
  const counters = order.querySelectorAll('.counter-button');

  if (counters) {
    counters.forEach((counter) => {
      counter.addEventListener('click', ({ target }) => {
        const countContainer = target.closest('.counter').querySelector('.count');
        const count = countContainer.textContent;
        let countValue = Number(count);
        let counterValue = getCounterValue(countValue, counter);
        let totalPriceValue = createPrice(data);
        let totalPrice = getTotalPrice(totalPriceValue, counterValue);

        if (countValue <= 0) {
          return countValue = 1;
        }

        if (totalPrice <= 0) {
          return totalPrice = 129;
        }

        countContainer.textContent = counterValue;
        target.closest('.order').querySelector('.order-price').textContent = `$${totalPrice}`;
      });
    });
  }
}
