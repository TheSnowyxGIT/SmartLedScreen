export class Color {

    private r_: number;
    private g_: number;
    private b_: number;

    /**
     * Return the Color associate to the given HSV
     * @param h hue [0 <= h <= 1]
     * @param s saturation [0 <= h <= 1]
     * @param v value [0 <= h <= 1]
     */
    static FromHSV(h: number, s: number, v: number): Color {
        let r: number = 0;
        let g: number = 0;
        let b: number = 0;
        let i, f, p, q, t;
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return new Color(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
    }

    /**
     * Return the Color associate to the given uint32
     */
    static FromUint32(uint32: number): Color {
        return new Color(uint32 >> 8 & 0xff, uint32 >> 16 & 0xff, uint32 & 0xff);
    }

    /**
     * Return the Color associate to the given hexadecimal string
     */
    static FromHEX(hex: string): Color {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16))
            : new Color(255, 255, 255);
    }
    
    /**
     * Return the Color associate to the given RGB
     */
    static FromRGB(r: number, g: number, b: number): Color {
        return new Color(r,g,b);
    }

    constructor(r: number, g: number, b: number) {
        this.r_ = r;
        this.g_ = g;
        this.b_ = b;
    }


    public getUint32(){
        const color = (this.g_ << 16) | (this.r_ << 8) | this.b_;
        return color;
    }
}
