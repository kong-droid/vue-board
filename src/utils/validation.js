export const isValidPassword = (str) => {
  const pattern = /^\d{4}$/;
  return !pattern.test(str);
};

export const isEmpty = (value) => {

  if (value === null) {
    return true;
  }

  const values = Object.values(value);

  for (const item of values) {
    if (checkSpace(item)) {
      return true;
    }
    if (item === '' || item !== null && item.length === 0) return true;
    if (item === null) return true;
  }

  if (value.length) {
    return value.length === 0;
  }

  if (value.trim().length) {
    return value.trim().length === 0;
  }

  if (checkSpace(value)) {
    return true;
  }

  return Object.keys(value).length === 0;
};

const checkSpace = (str) => {
  const pattern = /\s{2,}/g;
  return pattern.test(str);
};


export const getNow = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const second = now.getSeconds();
  return year + "-" + pad(month) + "-" + pad(day) + " " + pad(hour) + ":" + pad(minute) + ":" + pad(second);
};

// 0~9 까지 한 자리 수 데이터를 두 자리 수로 변환함
const pad = (number) => {
  if(number < 10) {
    return "0" + number;
  }
  return number;
};