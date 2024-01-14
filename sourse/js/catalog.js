// ____________ favorite ____________

const favorite = document.querySelectorAll('.favorite');

if (favorite) {
  favorite.forEach(element => {
    element.addEventListener('click', () => {
      element.classList.toggle('favorite-active');
    })
  });
}