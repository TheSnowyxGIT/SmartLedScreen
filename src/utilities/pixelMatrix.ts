import { Color } from "./color";

/* Basic Point interface */
export interface Point {
  x: number;
  y: number;
}

/* Options for the PixelMatrix class */
interface MatrixOptions {
  x_mirrored?: boolean;
  y_mirrored?: boolean;
  zigzag?: boolean;
}

export class PixelMatrix {
  private pixels_: Uint32Array;

  private width_: number;
  private height_: number;

  private options_: MatrixOptions;

  constructor(width: number, height: number, options?: MatrixOptions) {
    const defaultOptions: MatrixOptions = {
      x_mirrored: false,
      y_mirrored: false,
      zigzag: true,
    };
    this.options_ = { ...defaultOptions, ...options };

    this.pixels_ = new Uint32Array(height * width);
    this.height_ = height;
    this.width_ = width;
  }

  private isOutOfBound(point: Point): boolean {
    if (
      point.x < 0 ||
      point.x >= this.width_ ||
      point.y < 0 ||
      point.y >= this.height_
    ) {
      return true;
    }
    return false;
  }

  public getColor(point: Point): Color {
    if (this.isOutOfBound(point)) {
      return Color.FromHEX("#000000");
    }
    const index = this.getIndex(point);
    return Color.FromUint32(this.pixels_[index]);
  }

  public setColor(point: Point, color: Color): void {
    if (!this.isOutOfBound(point)) {
      const index = this.getIndex(point);
      this.pixels_[index] = color.getUint32();
    }
  }

  public fillColor(color: Color): void {
    const color_uint32 = color.getUint32();
    for (let i = 0; i < this.width_ * this.height_; i++) {
      this.pixels_[i] = color_uint32;
    }
  }

  public getCoord(index: number): Point {
    let x = Math.floor(index / this.height_);
    let y = index % this.height_;
    if (this.options_.zigzag && x % 2 == 0) {
      y = this.height_ - 1 - y;
    }
    if (this.options_.y_mirrored) {
      y = this.height_ - 1 - y;
    }
    if (this.options_.x_mirrored) {
      x = this.width_ - 1 - x;
    }
    return {
      x: x,
      y: y,
    };
  }

  public getIndex(point: Point): number {
    let x = point.x;
    let y = point.y;
    if (this.options_.x_mirrored) {
      x = this.width_ - x - 1;
    }
    if (this.options_.y_mirrored) {
      y = this.height_ - y - 1;
    }
    if (this.options_.zigzag && x % 2 == 0) {
      return x * this.height_ + (this.height_ - 1 - y);
    }
    return x * this.height_ + y;
  }

  public ToArray(): Uint32Array {
    return this.pixels_;
  }
}
