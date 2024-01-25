export const createPrice = ({ price }) => {
  const order = document.querySelector('.order');
  const totalPrice = order.querySelector('.order-price');
  let totalPriceValue = totalPrice.textContent;

  totalPriceValue = price.value;

  return totalPriceValue;
};
