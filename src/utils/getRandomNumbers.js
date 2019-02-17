function getRandomInt (min,max) {return Math.floor(Math.random() * (max - min + 1)) + min}

export default {
    getRandomFloat: (min,max) => {
        return (Math.random() * (max - min)) + min
    },
    getRandomItem: (array) => {
        return array[getRandomInt(0, array.length - 1)]
    }
}