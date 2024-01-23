import myModal from '../modal-init.js'

export const showModal = (text) => {
  const modalErrorText = document.getElementById('modal-text');
  modalErrorText.textContent = text,
    myModal.open('#myModal')
}