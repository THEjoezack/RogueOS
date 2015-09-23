(function(root) {
    'use strict';

    var MapBuilder = function MapBuilder() {};

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
                data: this.randomMap(50, 50)
            };
        },
        randomMap: function(width, height) {
            var digger = new root.ROT.Map.Digger(width, height);
            var map = [];
            var digCallback = function(x, y, value) {
                if(!map[x]) {
                    map[x] = [];
                }
                if (value) {
                    map[x][y] = "#";
                } else {
                    map[x][y] = ".";
                }
            }
            digger.create(digCallback.bind(this));
            return map;
        },
        staticMap: function() {
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
    };

    root.RogueOS.MapBuilder = MapBuilder;

})(this);