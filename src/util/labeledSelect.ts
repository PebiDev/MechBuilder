// import React from "react";
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   SelectChangeEvent,
// } from "@mui/material";

// interface LabeledSelectProps {
//   id: string;
//   label: string;
//   value: string;
//   name?: string;
//   onChange: (event: SelectChangeEvent) => void;
//   options: { value: string, label: string }[];
//   minWidth?: number;
// }

// const LabeledSelect: React.FC<LabeledSelectProps> = ({
//   id,
//   label,
//   value,
//   name,
//   onChange,
//   options,
//   minWidth = 180,
// }) => {
//   const labelId = `${id}-label`;

//   return (
//     <FormControl variant="outlined" sx={{ margin: 1, minWidth }}>
//       <InputLabel id={labelId}>{label}</InputLabel>
//       <Select
//         labelId={labelId}
//         id={id}
//         name={name ?? id}
//         value={value}
//         onChange={onChange}
//         label={label}
//         input={<OutlinedInput id={id} label={label} />}
//       >
//         {options.map((opt) => (
//           <MenuItem key={opt.value} value={opt.value}>
//             {opt.label}
//           </MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// export default LabeledSelect;

//needs values like this:
// const tonnageOptions = [
//     { value: "20", label: "20 tons" },
//     { value: "25", label: "25 tons" },
//     { value: "30", label: "30 tons" },

//   ];
