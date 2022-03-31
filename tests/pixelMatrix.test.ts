import { PixelMatrix }  from "../src/utilities/pixelMatrix";

import * as assert from "assert"


describe("PixelMatrix", () => {

    it('Default Options Matrix', () => {
        const matrix = new PixelMatrix(32, 8);
        assert.equal(5, matrix.getIndex(matrix.getCoord(5)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(9)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(250)));

        assert.equal({x: 0, y: 5}, matrix.getCoord(matrix.getIndex({x: 0, y: 5})));
        assert.equal({x: 1, y: 7}, matrix.getCoord(matrix.getIndex({x: 1, y: 7})));
        assert.equal({x: 31, y: 0}, matrix.getCoord(matrix.getIndex({x: 31, y: 0})));
    })

    it('X reversed Matrix', () => {
        const matrix = new PixelMatrix(32, 8, {x_mirrored: true});
        assert.equal(5, matrix.getIndex(matrix.getCoord(5)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(9)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(250)));

        assert.equal({x: 0, y: 5}, matrix.getCoord(matrix.getIndex({x: 0, y: 5})));
        assert.equal({x: 1, y: 7}, matrix.getCoord(matrix.getIndex({x: 1, y: 7})));
        assert.equal({x: 31, y: 0}, matrix.getCoord(matrix.getIndex({x: 31, y: 0})));
    })

    it('Y reversed Matrix', () => {
        const matrix = new PixelMatrix(32, 8, {y_mirrored: true});
        assert.equal(5, matrix.getIndex(matrix.getCoord(5)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(9)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(250)));

        assert.equal({x: 0, y: 5}, matrix.getCoord(matrix.getIndex({x: 0, y: 5})));
        assert.equal({x: 1, y: 7}, matrix.getCoord(matrix.getIndex({x: 1, y: 7})));
        assert.equal({x: 31, y: 0}, matrix.getCoord(matrix.getIndex({x: 31, y: 0})));
    })

    it('No zigzag Matrix', () => {
        const matrix = new PixelMatrix(32, 8, {zigzag: false});
        assert.equal(5, matrix.getIndex(matrix.getCoord(5)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(9)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(250)));

        assert.equal({x: 0, y: 5}, matrix.getCoord(matrix.getIndex({x: 0, y: 5})));
        assert.equal({x: 1, y: 7}, matrix.getCoord(matrix.getIndex({x: 1, y: 7})));
        assert.equal({x: 31, y: 0}, matrix.getCoord(matrix.getIndex({x: 31, y: 0})));
    })

    it('Y/X reversed Matrix', () => {
        const matrix = new PixelMatrix(32, 8, {y_mirrored: true, x_mirrored: true});
        assert.equal(5, matrix.getIndex(matrix.getCoord(5)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(9)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(250)));

        assert.equal({x: 0, y: 5}, matrix.getCoord(matrix.getIndex({x: 0, y: 5})));
        assert.equal({x: 1, y: 7}, matrix.getCoord(matrix.getIndex({x: 1, y: 7})));
        assert.equal({x: 31, y: 0}, matrix.getCoord(matrix.getIndex({x: 31, y: 0})));
    })

    it('Y/X reversed no zigzag Matrix', () => {
        const matrix = new PixelMatrix(32, 8, {y_mirrored: true, x_mirrored: true, zigzag: false});
        assert.equal(5, matrix.getIndex(matrix.getCoord(5)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(9)));
        assert.equal(5, matrix.getIndex(matrix.getCoord(250)));

        assert.equal({x: 0, y: 5}, matrix.getCoord(matrix.getIndex({x: 0, y: 5})));
        assert.equal({x: 1, y: 7}, matrix.getCoord(matrix.getIndex({x: 1, y: 7})));
        assert.equal({x: 31, y: 0}, matrix.getCoord(matrix.getIndex({x: 31, y: 0})));
    })

})
