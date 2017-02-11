export default function randomNumber(getMin, getMax) {
  const min = Math.ceil(getMin);
  const max = Math.floor(getMax);
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}
