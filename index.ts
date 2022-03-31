// init font
/*
const basic_font = new Font(path.join(__dirname, "fonts/font_basic.json"));
const screen = new Screen(32, 8, 18);
*/

import { Date_displayer } from "./src/date";
import { Screen } from "./src/screen";
import { Font, Text_displayer } from "./src/text";
import { Color } from "./src/utilities/color";

const screen = new Screen({x: 32, y: 8}, 18);

const date_displayer = new Date_displayer(screen, new Font("/home/pi/Desktop/SmartLedScreen/fonts/font_basic.json"));
date_displayer.start();



