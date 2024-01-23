import { BASE_URL } from '../constants.js';

export const getUrl = (url) => {
  const newUrl = new URL(url, BASE_URL);
  return newUrl.href;
}