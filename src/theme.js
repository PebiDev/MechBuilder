import { amber } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const primaryColor = "#ffa726";
const secondaryColor = "#ffc400";

const theme = createTheme({
  palette: {
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: "#ffc400",
    },
  },

  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },

  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          // Default border color
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryColor,
          },
          // Hover state
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryColor,
          },
          // Focused state
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: primaryColor,
          },
        },
        input: {
          padding: 8,
          color: "#ffffff", // Optional: text color
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: primaryColor,
          "&.Mui-focused": {
            color: "#ffa726",
          },
        },
      },
    },
  },
});

export default theme;
