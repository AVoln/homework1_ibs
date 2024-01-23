export const getCounterValue = (countValue, counter) => {
  if (counter.classList.contains('counter-button--plus')) {
    return countValue + 1;
  }

  return countValue - 1;
};