const random = {};

random.numberString = (size = 6) => {
    return Math.floor(Math.random() * 10 ** (size)).toString().padStart(size, '0');
};

module.exports = random;
