module.exports.Color = class Color {
    constructor(r,g,b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }
    getColor() {
        var color = (this.g << 16) | (this.r << 8) | this.b;
        return color;
    }
}

module.exports.RGB = (r,g,b) => new this.Color(r,g,b);

module.exports.HEX = (hex) => {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? new this.Color(parseInt(result[1], 16),parseInt(result[2], 16),parseInt(result[3], 16))
    : new this.Color(255,255,255);
};

module.exports.UInt32 = (uint32) => {
    return new this.Color(uint32 >> 8 & 0xff, uint32 >> 16 & 0xff, uint32 & 0xff);
};


module.exports.HSVtoColor = (h, s, v) => {
    var r, g, b, i, f, p, q, t;
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
