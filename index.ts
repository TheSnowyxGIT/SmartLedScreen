// init font
/*
const basic_font = new Font(path.join(__dirname, "fonts/font_basic.json"));
const screen = new Screen(32, 8, 18);
*/

import Font from "./src/font";

const font = new Font("Pixeled.ttf");
font.fontSize = 5;

font.waitLoading().then(() => {
  const text = font.getText("Adrien");
  console.log(text);
});

/*
// Load the font file
opentype.load("Pixeled.ttf", function (err, font) {
  if (err || !font) {
    console.error("Could not load font: " + err);
  } else {
    // Create a canvas
    const cwidth = 32; // Set appropriate width
    const cheight = 32; // Set appropriate height
    const canvas = createCanvas(cwidth, cheight);
    const ctx = canvas.getContext("2d");

    const glyph = font.charToGlyph("A");

    const width = glyph.advanceWidth;
    if (width === undefined) {
      return;
    }

    const scale = cheight / font.unitsPerEm;

    const path = glyph.getPath(0, 0, 72);

    console.log(path);

    path.draw(ctx as any);

    const imageData = ctx.getImageData(0, 0, cwidth, cheight);
    const matrix = [];

    for (let y = 0; y < cheight; y++) {
      const row = [];
      for (let x = 0; x < cwidth; x++) {
        const idx = (y * cwidth + x) * 4;
        // If the pixel is not white, then it's part of the glyph
        row.push(imageData.data[idx]);
      }
      matrix.push(row);
    }

    console.log(matrix);
  }
});
*/
