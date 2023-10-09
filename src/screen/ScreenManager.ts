import { PixelMatrix, Point } from "../utilities/pixelMatrix";
import { Color } from "../utilities/color";
import IScreen from "./IScreen";

export default class ScreenManager {
  private matrix_: PixelMatrix;

  private resolution_: Point;
  public get resolution(): Point {
    return this.resolution_;
  }

  private _screen?: IScreen;
  public set screen(value: IScreen) {
    this._screen = value;
  }

  constructor(resolution: Point) {
    this.matrix_ = new PixelMatrix(resolution.x, resolution.y);
    this.resolution_ = resolution;
  }

  public clear(refresh: boolean = true): void {
    this.fill(Color.Black, refresh);
  }

  public fill(color: Color, refresh: boolean = true): void {
    this.matrix_.fillColor(color);
    this.refresh(refresh);
  }

  public setPixel(point: Point, color: Color, refresh: boolean = true): void {
    this.matrix_.setColor(point, color);
    this.refresh(refresh);
  }

  public setMatrix(
    grayScale: number[][],
    color: Color,
    refresh: boolean = true
  ): void {
    for (let y = 0; y < Math.min(grayScale.length, this.resolution_.y); y++) {
      for (
        let x = 0;
        x < Math.min(grayScale[y].length, this.resolution_.x);
        x++
      ) {
        if (grayScale[y][x] > 0) {
          this.setPixel(
            { x: x, y: y },
            Color.colorWithRatio(color, grayScale[y][x]),
            false
          );
        }
      }
    }
    this.refresh(refresh);
  }

  public refresh(condition: boolean = true): void {
    if (condition) this._screen?.render(this.matrix_);
  }
}
