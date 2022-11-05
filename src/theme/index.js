import { extendTheme } from "@chakra-ui/react";

import { colors } from "./foundations/colors";
import { buttonTheme } from "./components/button";
import { containerTheme } from "./components/container";
import { textTheme } from "./components/text";
import { fontWeights, fonts } from "./foundations/fonts";
import { shadows } from "./foundations/shadows";
import { sizes } from "./foundations/sizes";

const overrides = {
  colors,
  fontWeights,
  fonts,
  sizes,
  shadows,
  components: {
    Button: buttonTheme,
    Container: containerTheme,
    Text: textTheme,
  },
};

export default extendTheme(overrides);
