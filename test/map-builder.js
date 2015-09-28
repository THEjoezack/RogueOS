var expect = require('chai').expect;

describe('default map', function() {
    describe('#build()', function() {

        var mock, mapData;
        beforeEach(function() {
            var mapBuilder = require('../client/map-builder');
            var sinon = require('sinon');
            var digger = {
                create: function(){}
            };

            mock = sinon.mock(digger);
            mock.expects('create').once().returns({
                map: [],
                freeSpaces: []
            });
            mapData = mapBuilder.build(digger);
        });

        it('created via dependency', function () {
            mock.verify();
        });

        it('should have a default tile type', function () {
            expect(mapData.defaultType.length > 0).to.be.true;
        });

        it('should have a default char map', function () {
            expect(mapData.charToType).to.not.be.empty;
        });

    });
});