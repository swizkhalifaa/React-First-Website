
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#1db954",
        // dark: will be calculated from palette.primary.main,
        // contrastText: will be calculated to contrast with palette.primary.main
      },
      secondary: {
        main: "#FF1654",
        // dark: will be calculated from palette.secondary.main,
        secondary: "#A3E7FC",
      },
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold: 3,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
    },
  });

export default theme;