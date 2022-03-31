import { existsSync, readFileSync } from "fs";
import { Screen } from "./screen";
import { Color } from "./utilities/color";
import { Point } from "./utilities/pixelMatrix";

type char = Array<Array<number>>
type chars = Record<string, char>

export class Font {

    private chars_: chars;
    private default_char_: char;

    constructor(filePath: string) {
        const file_exists: boolean = existsSync(filePath);
        if (!file_exists) {
            throw new Error(`${filePath}: no such file or directory.`);
        }
        const raw_data = readFileSync(filePath, 'utf8');
        const data = JSON.parse(raw_data);
        if (!data.default) {
            throw new Error(`${filePath}: parse error no default char found.`);
        }
        if (!data.matrixes) {
            throw new Error(`${filePath}: parse error no chars found.`);
        }
        this.default_char_ = data.default;
        this.chars_ = data.matrixes;
    }

    public getDefault(): char {
        return this.default_char_;
    }

    public size(): number {
        return Object.keys(this.chars_).length;
    }

    public exists(code: string): boolean {
        return typeof this.chars_[code] !== "undefined";
    }

    public get(code: string): char {
        if (this.exists(code)) {
            return this.chars_[code];
        }
        return this.getDefault();
    }
}


interface TextDisplayOptions {
    scroll?: boolean;
    visible?: boolean;
    color?: Color;
    colors?: Array<Color>;
    speed?: number;
    waitTime?: number;
}

export class Text_displayer {

    /**
     * Get the width that will take a text
     */
    static text_font_width(text: string, font: Font) {
        let size = 0;
        for (let i = 0; i < text.length; i++) {
            size += font.get(text[i]).length + 1;
        }
        return size
    }


    private screen_: Screen;
    private font_: Font;

    constructor(screen: Screen, font: Font) {
        this.screen_ = screen;
        this.font_ = font;
    }

    public font_set(font: Font): void {
        this.font_ = font;
    }

    private write_char(code: string, corner_bl: Point, color: Color) {
        let char = this.font_.get(code);
        let char_width = char.length;
        let char_height = char[0].length;
        let x_max = corner_bl.x + char_width;
        let y_max = corner_bl.y + char_height;
        let x = corner_bl.x < 0 ? 0 : corner_bl.x;
        while (x < this.screen_.size_get().x && x < x_max) {
            let y = corner_bl.y < 0 ? 0 : corner_bl.y;
            while (y < this.screen_.size_get().y && y < y_max) {
                if (char[x - corner_bl.x][y - corner_bl.y] !== 0) {
                    this.screen_.setPixel({ x: x, y: y }, color, false);
                } else {
                    this.screen_.setPixel({ x: x, y: y }, Color.Black, false);
                }
                y += 1;
            }
            x += 1;
        }
    }

    private display_text(text: string, point: Point, options: Required<TextDisplayOptions>) {
        // determine color
        function get_color(colors: Array<Color>, color: Color, index: number): Color {
            if (index >= colors.length)
                return color;
            return colors[index];
        }

        const write_text = (x: number, y: number) => {
            let x_cursor = x;
            for (let i = 0; i < text.length; i++) {
                this.write_char(text[i], { x: x_cursor, y: y }, get_color(options.colors, options.color, i));
                x_cursor += this.font_.get(text[i]).length + 1;
                /*if (x_cursor >= this.screen_.size_get().x)
                    break;*/
            }
        }

        let text_width = Text_displayer.text_font_width(text, this.font_);

        write_text(point.x, point.y);
        this.screen_.refresh(options.visible);

        if (text_width + point.x > this.screen_.size_get().x && options.scroll) {
            this.screen_.sleep(options.waitTime);
            let start = 0;
            while (start >= this.screen_.size_get().x - text_width) {
                this.screen_.clear(false);
                write_text(start, point.y);
                this.screen_.refresh(options.visible);
                this.screen_.sleep(1000 / options.speed);
                start -= 1;
            }
        }
    }

    public display(text: string, options?: TextDisplayOptions) {

        const defaultOptions: Required<TextDisplayOptions> = {
            scroll: true,
            visible: true,
            color: Color.White,
            colors: [],
            speed: 50,
            waitTime: 1000 // ms
        };
        const filled_opt: Required<TextDisplayOptions> = { ...defaultOptions, ...options };

        let text_width = Text_displayer.text_font_width(text, this.font_);

        let cursor: number = 0; // current x position
        if (text_width <= this.screen_.size_get().x) { // the text is smaller than the screen
            cursor = Math.floor((this.screen_.size_get().x - text_width) / 2);
        }

        this.display_text(text, {x: cursor, y: 0}, filled_opt);

    }

    public display_char(code: string, corner_bl: Point, color: Color) {
        this.write_char(code, corner_bl, color);
        this.screen_.refresh();
    }

    public displayAt(text: string, point: Point, options?: TextDisplayOptions) {
        const defaultOptions: Required<TextDisplayOptions> = {
            scroll: true,
            visible: true,
            color: Color.White,
            colors: [],
            speed: 50,
            waitTime: 1000 // ms
        };
        const filled_opt: Required<TextDisplayOptions> = { ...defaultOptions, ...options };

        this.display_text(text, point, filled_opt);
    }

}
