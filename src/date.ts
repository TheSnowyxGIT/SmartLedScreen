import { Screen } from "./screen";
import { Font, Text_displayer } from "./text";
import { Color } from "./utilities/color";
import { Point } from "./utilities/pixelMatrix";

interface DateDisplayerOptions {
    refreshRate?: number; // Hz
    colonBlick?: boolean;
    colonTickRate?: number; // number of ticks
}


export class Date_displayer{

    private screen_: Screen;
    private font_: Font;
    private options_: Required<DateDisplayerOptions>;
    private running_: boolean;
    private interval_: NodeJS.Timer;

    private colonTickNumber_: number = 0;
    private colonSwitch_: boolean = false;

    constructor(screen : Screen, font: Font, options?: DateDisplayerOptions){
        const defaultOptions: Required<DateDisplayerOptions> = {
            refreshRate: 1,
            colonBlick: true,
            colonTickRate: 1
        }
        this.options_ = {...defaultOptions, ...options};

        this.screen_ = screen;
        this.font_ = font;

        this.running_ = false;
        this.interval_ = setInterval(()=>{},0);
        clearInterval(this.interval_);
    }

    public font_set(font: Font): void {
        this.font_ = font;
    }

    private formatDateNumber(value: number): string {
        return value < 10 ? `0${value}` : value.toString();
    }

    private loop(): void{
        this.screen_.clear(false);
        const date: Date = new Date(); // get current time
        
        const hours = this.formatDateNumber(date.getHours());
        const hours_width = Text_displayer.text_font_width(hours, this.font_);
        const minutes = this.formatDateNumber(date.getMinutes());
        const minutes_width = Text_displayer.text_font_width(minutes, this.font_);
        const seconds_value = date.getSeconds();
        const minute_value = date.getMinutes();

        const sep = ":";
        const sep_width = Text_displayer.text_font_width(sep, this.font_);

        let cursor = Math.ceil((this.screen_.size_get().x - (hours_width + minutes_width + sep_width)) / 2);

        const text_displayer = new Text_displayer(this.screen_, this.font_);
        text_displayer.displayAt(hours, {x: cursor, y: 0}, {scroll: false, visible: false, color: Color.FromHSV(0.5 + minute_value / 120,1,1)});
        cursor += hours_width;

        if (this.colonTickNumber_ % this.options_.colonTickRate == 0){
            if (this.colonSwitch_)
                text_displayer.displayAt(sep, {x: cursor, y: 0}, {scroll: false, visible: false});
            this.colonSwitch_ = ! this.colonSwitch_;
        }

        cursor += sep_width;
        text_displayer.displayAt(minutes, {x: cursor, y: 0}, {scroll: false, visible: false, color: Color.FromHSV(0.5 + seconds_value / 120,1,1)});

        this.screen_.refresh();

        this.colonTickNumber_ += 1;
        if (this.colonTickNumber_  > this.options_.colonTickRate)
            this.colonTickNumber_ = 0;
    }

    public start(): boolean {
        if (!this.running_){
            this.interval_ = setInterval(() => {
                this.loop();
            }, 1000 / this.options_.refreshRate);
            this.running_ = true;
            return true;
        }
        return false;
    }

    public stop(): boolean {
        if (this.running_){
            clearInterval(this.interval_);
            this.running_ = false;
            return true;
        }
        return false;
    }

}
