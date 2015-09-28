var charToType = {
    '#': 'wall',
    '.': 'floor',
    '+': 'door'
};

var randomMap = function(digger) {
    var map = [];
    var freeSpaces = [];
    var digCallback = function(x, y, value) {
        if(!map[x]) {
            map[x] = [];
        }
        if (value) {
            map[x][y] = '#';
        } else {
            map[x][y] = '.';
            freeSpaces.push({ x: x, y: y});
        }
    };
    digger.create(digCallback.bind(this));
    return { map: map, freeSpaces: freeSpaces };
};

exports.build = function(digger) {
    var map = randomMap(digger);
    return {
        defaultType: 'floor',
        charToType: charToType,
        map: map.map,
        freeSpaces: map.freeSpaces
    };
};