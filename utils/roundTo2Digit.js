export default function roundTo2Digit(number) {
  number = Number(number);
  number *= 100;
  number = Math.round(number);
  number = number / 100;
  return number;
}
