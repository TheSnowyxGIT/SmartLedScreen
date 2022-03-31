import * as ws281x from "rpi-ws281x";
import { PixelMatrix, Point } from "./utilities/pixelMatrix";
import { Color } from "./utilities/color";

export class Screen {

    private matrix_: PixelMatrix;
    private size_: Point;

    constructor(size: Point, gpio: number){
        this.matrix_ = new PixelMatrix(size.x, size.y);
        this.size_ = size;
        ws281x.configure({
            brightness: 150,
            gpio: gpio,
            leds: size.x * size.y,
            stripType: "rgb"
        })
    }

    public size_get(): Point {
        return this.size_;
    }

    public fill(color: Color, refresh: boolean = true): void{
        this.matrix_.fillColor(color);
        this.refresh(refresh);
    }

    public clear(refresh: boolean = true): void {
        this.fill(Color.Black, refresh);
    }

    public setPixel(point: Point, color: Color, refresh: boolean = true): void{
        this.matrix_.setColor(point, color);
        this.refresh(refresh);
    }

    public refresh(condition: boolean = true): void {
        if (condition)
            ws281x.render(this.matrix_.ToArray());
    }

    public sleep(ms: number): void {
        ws281x.sleep(ms);
    }
}
