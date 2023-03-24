function isValidText(value, minLength = 1) {
  return value && value.trim().length >= minLength;
}

function isValidDate(value) {
  const date = new Date(value);
  return value && date !== 'Invalid Date';
}

function isValidEmail(value) {
  return value && value.includes('@');
}
module.exports ={
    isValidText, isValidDate, isValidEmail
}