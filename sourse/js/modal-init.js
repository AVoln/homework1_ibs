import HystModal from "./modal-error.js";

const myModal = new HystModal({
  linkAttributeName: 'data-modal-error',
  catchFocus: true,
  waitTransitions: true,
  closeOnEsc: true,
});

export default myModal;