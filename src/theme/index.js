import { extendTheme } from "@chakra-ui/react";

import { colors } from "./foundations/colors";
import { buttonTheme } from "./components/button";
import { containerTheme } from "./components/container";
import { textTheme } from "./components/text";
import { fontWeights, fonts, fontSizes } from "./foundations/fonts";
import { shadows } from "./foundations/shadows";
import { sizes } from "./foundations/sizes";
import { Box } from "./components/box";

const breakpoints = ["30em", "62em"];

const overrides = {
  colors,
  fontWeights,
  fontSizes,
  fonts,
  sizes,
  shadows,
  breakpoints,
  components: {
    Button: buttonTheme,
    Container: containerTheme,
    Text: textTheme,
    Box,
  },
};

export default extendTheme(overrides);
