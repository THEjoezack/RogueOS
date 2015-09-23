// create the game instance
/*globals RL*/
var rl = RL;

/*globals RogueOS*/
var rogueOS = RogueOS;
var game = new rl.Game();

var keyBindings = {
    up: ['UP_ARROW', 'K', 'W'],
    down: ['DOWN_ARROW', 'J', 'S'],
    left: ['LEFT_ARROW', 'H', 'A'],
    right: ['RIGHT_ARROW', 'L', 'D'],
};

var mapBuilder = new rogueOS.MapBuilder();
var mapData = mapBuilder.build();

game.map.loadTilesFromArrayString(mapData.data, mapData.charToType, mapData.defaultType);
game.entityManager.loadFromArrayString(mapData.data, {
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
var entZombie = new RL.Entity(game, 'zombie');
game.entityManager.add(2, 8, entZombie);

var taken = [];
// set player starting position
function findFreeSpot(mapData) {
    for(var x = 0; x < mapData.data.length; x++) {
        for(var y = 0; y < mapData.data[x].length; y++) {
            if(mapData.data[y][x] === '.') {
                var skip = false;
                for(var i = 0; i < taken.length; i++) {
                    if(taken[i].x === x && taken[i].y === y) {
                        skip = true;
                        break;
                    }
                }
                if(skip) {
                    continue;
                }
                var point = {
                    x: x,
                    y: y
                };
                taken.push(point);
                return point;
            }
        }
    }
}

// or just add by entity type
for(var i = 0; i < 10; i++) {
    var spot = findFreeSpot(mapData);
    game.entityManager.add(spot.x, spot.y, 'zombie');
}

var playerSpot = findFreeSpot(mapData);
game.player.x = playerSpot.x;
game.player.y = playerSpot.y;

// make the view a little smaller
//game.renderer.resize(10, 14);

// get existing DOM elements
var document = this;
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