export const toNormalizeValue = (value) => {
  if (!value) {
    return '';
  }

  return value.trim().toLowerCase();
};