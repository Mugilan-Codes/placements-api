export const isDifferent = (compare, compareWith) => {
  return compare !== undefined && compare !== compareWith;
};

export const isEmptyObject = (obj) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};
