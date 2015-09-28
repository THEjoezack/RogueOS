(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*globals RL*/
var rl = RL;
var game = new rl.Game();
var x = 3;
var keyBindings = {
    up: ['UP_ARROW', 'K', 'W'],
    down: ['DOWN_ARROW', 'J', 'S'],
    left: ['LEFT_ARROW', 'H', 'A'],
    right: ['RIGHT_ARROW', 'L', 'D']
};

var mapBuilder = require('./map-builder');
var mapData = mapBuilder.build(ROT, 50, 50);

game.map.loadTilesFromArrayString(mapData.map, mapData.charToType, mapData.defaultType);
game.entityManager.loadFromArrayString(mapData.map, {
    'Z': 'zombie'
});

// add some lights
game.lighting.set(3, 7, 0, 0, 128);
game.lighting.set(12, 7, 0, 128, 0);

// generate and assign a map object (repaces empty default)
game.setMapSize(game.map.width, game.map.height);

// add input keybindings
game.input.addBindings(keyBindings);

// create entities and add to game.entityManager
var entZombie = new rl.Entity(game, 'zombie');
game.entityManager.add(2, 8, entZombie);

var tracker = require('./map-tracker');
var shuffled = tracker.shuffle(mapData.freeSpaces);

// toss some zombies in there!
for(var i = 0; i < 10; i++) {
    var spot = shuffled.pop();
    game.entityManager.add(spot.x, spot.y, 'zombie');
}

var playerSpot = shuffled.pop();
game.player.x = playerSpot.x;
game.player.y = playerSpot.y;

// make the view a little smaller
//game.renderer.resize(10, 14);

// get existing DOM elements
var document = window.document;
var mapContainerEl = document.getElementById('example-map-container');
var consoleContainerEl = document.getElementById('example-console-container');

// append elements created by the game to the DOM
mapContainerEl.appendChild(game.renderer.canvas);
consoleContainerEl.appendChild(game.console.el);

game.renderer.layers = [
    new rl.RendererLayer(game, 'map',       {draw: false,   mergeWithPrevLayer: false}),
    new rl.RendererLayer(game, 'entity',    {draw: false,   mergeWithPrevLayer: true}),
    new rl.RendererLayer(game, 'lighting',  {draw: true,    mergeWithPrevLayer: false}),
    new rl.RendererLayer(game, 'fov',       {draw: true,    mergeWithPrevLayer: false}),
];

game.console.log('The game starts.');
// start the game
game.start();
},{"./map-builder":2,"./map-tracker":3}],2:[function(require,module,exports){
exports.build = function(rot, width, height) {
    var map = randomMap(rot, width, height);
    return {
        defaultType: 'floor',
        charToType: charToType,
        map: map.map,
        freeSpaces: map.freeSpaces,
        width: width,
        height: height
    };
}

var charToType = {
    '#': 'wall',
    '.': 'floor',
    '+': 'door'
};

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
},{}],3:[function(require,module,exports){
exports.shuffle = function(array) {
    return require('knuth-shuffle').knuthShuffle(array.slice(0));
}
},{"knuth-shuffle":4}],4:[function(require,module,exports){
(function (global){
/*jshint -W054 */
(function (exports) {
  'use strict';

  // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
  function shuffle(array) {
    var currentIndex = array.length
      , temporaryValue
      , randomIndex
      ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  exports.knuthShuffle = shuffle;
}('undefined' !== typeof exports && exports || 'undefined' !== typeof window && window || global));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
