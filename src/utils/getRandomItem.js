import getRandomInt from './getRandomInt';

export default function getRandomItem(array) {return array[getRandomInt(0, array.length - 1)]}