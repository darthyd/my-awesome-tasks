export const findById = (id, array) => {
  return array.find((item) => item.id === id);
};

export const uniqId = (prefix = '') => {
  return `${prefix}${Math.random().toString(36).substr(2, 9)}`;
};
