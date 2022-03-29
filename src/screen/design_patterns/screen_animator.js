const Screen = require("../screen");
const { Color } = require("../utils/color");


/**
 * @class @design_pattern Screen
 * @description Play animations to the screen
 */
class Screen_animator {

    /**
     * @private @var
     */
    #screen;

    /**
     * 
     * @param {Screen} screen
     */
    constructor(screen) {
        this.#screen = screen;
    }


    /**
     * @description slide up the screen
     * @param {object} opt options
     * @param {number} [opt.speed=50] Speed of the slide
     */
    slideUp(opt) {
        if (!opt)
            opt = {};
        let speed = opt.speed || 15;
        for (let i = 0; i < this.#screen.height; i++) {
            for (let x = 0; x < this.#screen.width; x++) {
                for (let y = this.#screen.height - 2; y >= 0; y--) {
                    var pixel = this.#screen.getPixel(x, y);
                    this.#screen.setPixel(x, y + 1, pixel, false);
                }
                if (this.#screen.height > 0) {
                    this.#screen.setPixel(x, 0, new Color(0, 0, 0), false);
                }
            }
            this.#screen.render();
            this.#screen.sleep(1000 / speed);
        }
    }


}

module.exports = Screen_animator;
