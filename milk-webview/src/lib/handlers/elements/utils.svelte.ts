/** Function for given a random number between an upper and lower bound*/
export function getRandomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}
