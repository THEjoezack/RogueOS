var expect = require('chai').expect;
var target = require('../client/map-builder');

describe('default map', function() {
    var mapBuilder = new target.MapBuilder();
    describe('#build()', function() {
        var mapData = mapBuilder.build();

        it('should have at least one tile', function () {
            expect(mapData.data).to.not.be.empty;
        });
        it('should have a default tile type', function () {
            expect(mapData.defaultType.length > 0).to.be.true;
        });
        it('should have a default char map', function () {
            expect(mapData.charToType).to.not.be.empty;
        });
    });
});