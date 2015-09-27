(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}]},{},[1]);
