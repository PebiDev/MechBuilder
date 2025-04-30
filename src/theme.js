import { amber } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffa726",
    },
    secondary: {
      main: "#ffc400,",
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
            borderColor: "#ffa726",
          },
          // Hover state
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffa726",
          },
          // Focused state
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#ffa726",
          },
        },
        input: {
          padding: 8,
          color: "#ffa726", // Optional: text color
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#ffa726",
          "&.Mui-focused": {
            color: "#ffa726",
          },
        },
      },
    },
  },
});

export default theme;
