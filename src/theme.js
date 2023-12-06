import { createTheme } from "@mui/material/styles";
import { red, grey } from '@mui/material/colors';

export const theme = createTheme({
  shadows: [
    "none",
    "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
  ],
  palette: {
    primary: {
      main: "#000",
    },
    secondary: {
      main: red[500],
    },
    error: {
      main: red[500],
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
