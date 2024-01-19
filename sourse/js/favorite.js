import { getCards } from './api.js';

const data = await getCards();

if (data) {
  const favorite = document.querySelectorAll('.favorite');

  if (favorite) {
    favorite.forEach((element) => {
      element.addEventListener('click', (e) => {
        e.stopPropagation();
        element.classList.toggle('favorite-active');
      })
    });
  }
}
