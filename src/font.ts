import { Canvas } from "canvas";
import * as opentype from "opentype.js";
import * as fs from "fs";
import { inspect } from "util";

export default class Font {
  private _font?: opentype.Font;
  private _fontSize = 8;

  public get fontSize(): number {
    return this._fontSize;
  }
  public set fontSize(value: number) {
    this._fontSize = Math.max(value, 0);
  }

  private get font(): opentype.Font {
    if (!this._font) {
      throw new Error("Font not loaded");
    }
    return this._font;
  }

  private promise: Promise<void>;
  constructor(private fontPath: string) {
    this.promise = new Promise((resolve, reject) => {
      opentype.load(this.fontPath, (err, font) => {
        if (err || !font) {
          reject(err);
        }
        this._font = font;
        resolve();
      });
    });
  }

  public async waitLoading(): Promise<void> {
    return await this.promise;
  }

  getText(text: string): number[][] {
    const sizePath = this.font.getPath(text, 0, 0, this.fontSize);
    let sizes = sizePath.getBoundingBox();
    let height = Math.round(Math.abs(sizes.y2 - sizes.y1));
    let width = Math.round(Math.abs(sizes.x2 - sizes.x1));

    var canvas = new Canvas(width, height);
    var ctx = canvas.getContext("2d");
    const path = this.font.getPath(text, 0, height, this.fontSize);
    path.draw(ctx as any);

    const imageData = ctx.getImageData(0, 0, width, height);
    const matrix = [];

    for (let y = height - 1; y >= 0; y--) {
      const row = [];
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4 + 3;
        const value = (255 - imageData.data[idx]) / 255;
        row.push(value);
      }
      matrix.push(row);
    }
    return matrix;
  }
}
