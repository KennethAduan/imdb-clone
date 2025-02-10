export const isFalse = (value: boolean) => {
  return value === false;
};

export const isTrue = (value: boolean) => {
  return value === true;
};

export const isEmptyObject = (value: object) => {
  return Object.keys(value).length === 0;
};

export const isEmptyArray = (value: []) => {
  return value.length === 0;
};

export const isEmptyString = (value: string) => {
  return value === "";
};
