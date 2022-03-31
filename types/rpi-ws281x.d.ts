
interface ConfigureOption{
    leds?: number;
    stripType?: string;
    gpio?: number;
    brightness?: number
}

declare module "rpi-ws281x" {
    export function configure(options: ConfigureOption): void;
    export function reset(): void;
    export function sleep(ms: number): void;
    export function render(pixels: Uint32Array): void;
}

