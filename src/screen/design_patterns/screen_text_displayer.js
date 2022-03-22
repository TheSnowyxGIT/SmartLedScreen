const Screen = require("../screen");
const { Color } = require("../utils/color");
const Font = require("../utils/font")

class Screen_text_displayer {

    /**
     * 
     * @param {Screen} screen
     * @param {Font} font 
     */
    constructor(screen, font) {
        this.screen = screen;
        this.font = font;
    }

    /**
     * @private @method
     * @description Set a column in the screen according the column array
     * @param {boolean[]} column 
     * @param {number} x 
     * @param {Color} color 
     * @param {boolean} [render=true] 
     */
    #setColumn = (column, x, color, render = true) => {
        for (let y = 0; y < this.screen.height; y++) {
            if (column[y]) {
                this.screen.setPixel(x, y, color, false);
            } else {
                this.screen.setPixel(x, y, new Color(0, 0, 0), false); // turn off pixel
            }
        }
        this.screen.renderIfTrue(render);
    }

    /**
     * @private @method
     * @description Return the length that will take the text to be displayed
     * @param {string} str 
     * @returns {number}
     */
    #getSizeOfText = (str) => {
        let size = 0;
        for (let i = 0; i < str.length; i++) {
            let c = str[i];
            size += this.font.get(c).length + 1;
        }
        return size;
    }


    /**
     * @description add char at position x
     * @param {string} char_code 
     * @param {number} x 
     * @param {Color} color 
     * @param {boolean} [render=true] 
     */
    drawChar(char_code, x, color, render = true) {
        let matrix = this.font.get(char_code);
        let i = x;
        let char_width = matrix.length;
        while (i < this.screen.width && i < x + char_width) {
            if (i >= 0) {
                this.#setColumn(matrix[i - x], i, color, false);
            }
            i += 1;
        }
        this.screen.renderIfTrue(render);
    }

    /**
     * @description display a text to the screen.
     * @param {string} str The string to be displayed.
     * @param {object} [opt] The options:
     * @param {Color} [opt.color=white] The color of the text.
     * @param {number} [opt.speed=50] The scroll speed.
     * @param {number} [opt.waitTime=1000] The time between the first display and the scroll.
     */
    async drawText(str, opt) {
        if (!opt)
            opt = {};
        let color = opt.color || new Color(255, 255, 255);
        let speed = opt.speed || 50;
        let waitTime = opt.waitTime || 1000;

        let size = this.#getSizeOfText(str);
        let cursor = 0;
        if (size <= this.screen.width) {
            cursor = Math.floor((this.screen.width - size) / 2);
        }
        this.screen.clear(false);
        for (let i = 0; i < str.length; i++) {
            let c = str[i];
            this.drawChar(c, cursor, color, false);
            cursor += this.font.get(c).length + 1;
        }
        this.screen.render();
        if (size > this.width) {
            this.screen.sleep(waitTime);
            let start = 0;
            while (start >= this.screen.width - size) {
                cursor = start;
                this.screen.clear(false);
                for (let i = 0; i < str.length; i++) {
                    let c = str[i];
                    this.drawChar(c, cursor, color, false);
                    cursor += this.font.get(c).length + 1;
                }
                this.screen.render();
                this.screen.sleep(1000 / speed);
                start -= 1;
            }
        }
    }
}

module.exports = Screen_text_displayer;
