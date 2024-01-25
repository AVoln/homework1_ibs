import { showModal } from './utils/show-modal.js';

axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  return Promise.reject(
    showModal(error)
  )
});
