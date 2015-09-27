exports.build = function(rot, width, height) {
    var map = randomMap(rot, width, height);
    return {
        defaultType: 'floor',
        charToType: {
            '#': 'wall',
            '.': 'floor',
            '+': 'door'
        },
        map: map.map,
        freeSpaces: map.freeSpaces
    };
}

var randomMap = function(rot, width, height) {
    var digger = new rot.Map.Digger(width, height);
    var map = [];
    var freeSpaces = [];
    var digCallback = function(x, y, value) {
        if(!map[x]) {
            map[x] = [];
        }
        if (value) {
            map[x][y] = "#";
        } else {
            map[x][y] = ".";
            freeSpaces.push({ x: x, y: y});
        }
    }
    digger.create(digCallback.bind(this));
    return { map: map, freeSpaces: freeSpaces };
}

var staticMap = function() {
    return [
        '#####################',
        '#.........#.........#',
        '#.........#....##...#',
        '#.........+....##...#',
        '#.........#.........#',
        '#.#..#..#.#.........#',
        '#.........#...####+##',
        '#.........#...#.....#',
        '#.........#...#.....#',
        '#.........#...#.....#',
        '#####################'
    ];
}