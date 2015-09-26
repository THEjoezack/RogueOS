module.exports = {
    shuffle: shuffle
};

function shuffle(array) {
    return require('knuth-shuffle').knuthShuffle(array.slice(0));
}