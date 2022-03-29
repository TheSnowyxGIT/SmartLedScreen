const path = require("path")
const { Tasks } = require("@adrien.pgd/nodejsutilities")

const Font = require("./src/screen/utils/font");
const Screen = require("./src/screen/screen");
const Screen_text_displayer = require("./src/screen/design_patterns/screen_text_displayer")
const { Color } = require("./src/screen/utils/color");

// init font
const basic_font = new Font(path.join(__dirname, "fonts/font_basic.json"));
const screen = new Screen(32, 8, 18);

const screen_text_displayer = new Screen_text_displayer(screen, basic_font);
screen_text_displayer.drawText("13:20");

