import { PixelMatrix } from "../utilities/pixelMatrix";

export default abstract class IScreen {
  public abstract render(matrix: PixelMatrix): void;
}
