exports.shuffle = function(array) {
    return require('knuth-shuffle').knuthShuffle(array.slice(0));
}