import IScreen from "./IScreen";
import * as ws281x from "rpi-ws281x";
import { PixelMatrix, Point } from "../utilities/pixelMatrix";

export default class Ws281xScreen implements IScreen {
  constructor(size: Point, gpio: number) {
    ws281x.configure({
      brightness: 150,
      gpio: gpio,
      leds: size.x * size.y,
      stripType: "rgb",
    });
  }
  public render(matrix: PixelMatrix): void {
    ws281x.render(matrix.ToArray());
  }
}
