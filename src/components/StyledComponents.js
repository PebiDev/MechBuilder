import { styled } from "@mui/material/styles";
import {
  FormControlLabel,
  FormLabel,
  FormControl,
  Select,
} from "@mui/material";

export const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 180,
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  //   backgroundColor: theme.palette.background.paper,
  borderRadius: 4,
  padding: "8px 12px",
  minWidth: 200,
  "& .MuiSelect-select": {
    paddingRight: "32px", // space for dropdown icon
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
  },
}));

export const StyledFormControlLabel = styled(FormControlLabel)(() => ({
  color: "#ffa726",
}));
export const StyledFormLabel = styled(FormLabel)(() => ({
  color: "#ffa726",
}));
