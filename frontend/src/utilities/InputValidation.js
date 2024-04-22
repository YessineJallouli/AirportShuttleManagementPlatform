export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const isWhiteSpace = (val) => {
  const regex = /^(?=.*\s)/;
  return regex.test(val);
};

export const isContainsUppercase = (val) => {
  const regex = /^(?=.*[A-Z])/;
  return regex.test(val);
};

export const isContainsLowercase = (val) => {
  const regex = /^(?=.*[a-z])/;
  return regex.test(val);
};

export const isContainsNumber = (val) => {
  const regex = /^(?=.*[0-9])/;
  return regex.test(val);
};

export const isContainsSymbol = (val) => {
  const regex = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
  return regex.test(val);
};

export const isValidLength = (val) => {
  const regex = /^.{8,16}$/;
  return regex.test(val);
};

export const phoneNumberRegex =
   /^\d{8}$/;

