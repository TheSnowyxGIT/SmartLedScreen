const fs = require("fs");
const path = require("path");

class Font
{
    /**
     * @private @var
     */
    #chars;
    #default;
    #path;

    /**
     * @param {string} path Path of the font json file
     */
    constructor(path){
        this.#path = path;
        this.#chars = {};
        this.#default = [];
        this.#load();
    }

    #load = () => {
        let p = this.#path;
        let exists = fs.existsSync(p);
        if (exists){
            var data = fs.readFileSync(p, 'utf8');
            let json = JSON.parse(data);
            this.#chars = json.matrixes;
            this.#default = json.default;
        }else{
            throw new Error(`${p} does not exists`)
        }
    }

    exists(char_code){
        return Object.keys(this.#chars).includes(char_code);
    }

    get(char_code){
        if (this.exists(char_code)){
            return this.#chars[char_code];
        }else{
            return this.#default;
        }
    }
}

module.exports = Font;
