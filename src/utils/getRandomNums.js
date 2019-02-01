export default {
    getRandomInt: (min,max) => {return Math.floor(Math.random() * (max - min + 1)) + min},
    getRandomItem: (array) => {return array[this.getRandomInt(0, array.length - 1)]},
    getRandomFloat: (min,max) => {return (Math.random() * (max - min)) + min}
}

