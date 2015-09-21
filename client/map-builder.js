(function(root) {
    'use strict';

    var MapBuilder = function MapBuilder(game) {
        this.game = game;
    };

    MapBuilder.prototype = {
        constructor: MapBuilder,
        build: function(){
            return {
                defaultType: 'floor',
                charToType: {
                    '#': 'wall',
                    '.': 'floor',
                    '+': 'door'
                },
                data: [
                    '#####################',
                    '#.........#.........#',
                    '#....Z....#....##...#',
                    '#.........+....##...#',
                    '#.........#.........#',
                    '#.#..#..#.#.........#',
                    '#.........#...####+##',
                    '#.........#...#.....#',
                    '#.........#...#.....#',
                    '#.........#...#.....#',
                    '#####################'
                ]
            };
        }
    };

    root.MapBuilder = MapBuilder;

}(this.RogueOS || this));