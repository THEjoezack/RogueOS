// entities
var box = require('./box');
var button = require('./button');

/*globals RL*/
var rl = RL;
var game = new rl.Game();

var keyBindings = {
    up: ['UP_ARROW', 'K', 'W'],
    down: ['DOWN_ARROW', 'J', 'S'],
    left: ['LEFT_ARROW', 'H', 'A'],
    right: ['RIGHT_ARROW', 'L', 'D']
};

var mapBuilder = require('./map-builder');
var level = mapBuilder.build(1);

game.map.loadTilesFromArrayString(level.map, level.charToType, level.defaultType);

// generate and assign a map object (replaces empty default)
game.setMapSize(game.map.width, game.map.height);

// add input keybindings
game.input.addBindings(keyBindings);

// create entities and add to game.entityManager
function addEntity(entity, items) {
    for(var i = 0; i < items.length; i++) {
        var position = items[i];
        var item = new rl.Entity(game, entity);
        game.entityManager.add(position.x, position.y, item);
    }
}

// add entities
rl.Entity.Types.box = box.create(game);
addEntity('box', level.boxes);
rl.Entity.Types.button = button.create(game);
addEntity('button', level.buttons);
game.player.x = level.startingPosition.x;
game.player.y = level.startingPosition.x;

// make the view a little smaller
//game.renderer.resize(20, 20);

// get existing DOM elements
var document = window.document;
var mapContainerEl = document.getElementById('example-map-container');
var consoleContainerEl = document.getElementById('example-console-container');

// append elements created by the game to the DOM
mapContainerEl.appendChild(game.renderer.canvas);
consoleContainerEl.appendChild(game.console.el);

game.renderer.layers = [
    new rl.RendererLayer(game, 'map',       {draw: false,   mergeWithPrevLayer: false}),
    new rl.RendererLayer(game, 'entity',    {draw: true,   mergeWithPrevLayer: true}),
    //new rl.RendererLayer(game, 'lighting',  {draw: true,    mergeWithPrevLayer: false}),
    new rl.RendererLayer(game, 'fov',       {draw: false,    mergeWithPrevLayer: false}),
];

game.console.log('The game starts.');
// start the game
game.start();