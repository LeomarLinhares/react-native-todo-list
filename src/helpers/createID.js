export default function createID(size) {
  const randomized = Math.ceil(Math.random() * Math.pow(10, size));
  let digit = Math.ceil(Math.log(randomized));
  while(digit > 10){
    digit = Math.ceil(Math.log(digit));
  }
  return `${randomized}-${digit}`;
};
