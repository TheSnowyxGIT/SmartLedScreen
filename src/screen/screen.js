var ws281x = require('rpi-ws281x');
const Font = require("./utils/font");
const { Color, UInt32 } = require("./utils/color");

class Screen {

    /**
     * @constructor
     * @param {number} width 
     * @param {number} height 
     * @param {number} gpio 
     */
    constructor(width, height, gpio) {
        this.pixels = new Uint32Array();

        this.height = height;
        this.width = width;

        this.config = {};
        this.config.leds = this.height * this.width;
        this.config.gpio = gpio;
        this.config.brightness = 255;
        this.config.stripType = "rgb";

        this.pixels = new Uint32Array(this.config.leds);
        ws281x.configure(this.config);
    }

    /**
     * @description fill the screen
     * @param {Color} color 
     * @param {boolean} [render=true] 
     */
    fill(color, render = true) {
        if (!(color instanceof Color)) {
            throw new Error("invalid parameter.");
        }
        let v = color.getColor();
        for (var i = 0; i < this.config.leds; i++) {
            this.pixels[i] = v;
        }
        this.renderIfTrue(render);
    }

    /**
     * @description set pixel at (x,y)
     * @param {number} x 
     * @param {number} y 
     * @param {Color} color 
     * @param {boolean} [render=true] 
     */
    setPixel(x, y, color, render = true) {
        let index = this.getIndex(x, y);
        if (!(color instanceof Color)) {
            throw new Error("invalid parameter.");
        }
        let v = color.getColor();
        this.pixels[index] = v;
        this.renderIfTrue(render);
    }

    getPixel(x, y){
        var uint32 = this.pixels[this.getIndex(x, y)];
        return UInt32(uint32);
    }

    /**
     * @description returns the equivalent index of the coord (x,y)
     * @param {number} x 
     * @param {number} y 
     * @returns {number} 
     */
    getIndex(x, y) {
        if (typeof x != "number" || typeof y != "number") {
            throw new Error("x and y need to be numbers.");
        }
        if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
            throw new Error("x and/or y out of screen.");
        }
        if (x % 2 == 0) {
            return (x * this.height) + (this.height - 1 - y);
        }
        return (x * this.height) + y;
    }

    /**
     * 
     * @param {boolean} [render=true] 
     */
    clear(render = true) {
        this.pixels = new Uint32Array(this.config.leds);
        this.renderIfTrue(render);
    }

    /**
    * 
    * @param {boolean} state 
    */
    renderIfTrue(state) {
        if (state) {
            this.render();
        }
    }

    render() {
        ws281x.render(this.pixels);
    }

    sleep(ms) {
        ws281x.sleep(ms);
    }
}

module.exports = Screen;
