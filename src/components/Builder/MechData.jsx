import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import AdvancedMechData from "../Advanced-Builder/AdvancedMechData";
import { MenuItem, TextField, InputLabel, Select } from "@mui/material";
import { StyledSelect, StyledFormControl } from "../StyledComponents";
import { useMemo } from "react";

const MechData = () => {
  const mechTonnage = useMemo(
    () => [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100],
    []
  );

  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);

  const nameHandler = (event) => {
    dispatch(mechActions.setName(event.target.value));
  };

  const mechTonnageHandler = (event) => {
    dispatch(mechActions.setMechTonnage(event.target.value));
  };

  return (
    <div className="mech-data form-element">
      <TextField
        label="Name your Mech"
        value={mech.name}
        onChange={nameHandler}
        variant="outlined"
        className="name-textfield"
      />{" "}
      <br />
      {ui.advancedOptions && <AdvancedMechData />}
      <br />
      <StyledFormControl>
        <InputLabel id="select-mech-tonnage-label">
          Select Mech Tonnage
        </InputLabel>
        <StyledSelect
          labelId="select-mech-tonnage-label"
          id="select-mech-tonnage"
          value={mech.tonnage}
          label="Select Mech Tonnage"
          onChange={mechTonnageHandler}
        >
          {mechTonnage.map((tonnage) => {
            return (
              <MenuItem key={tonnage} value={tonnage}>
                {tonnage}
              </MenuItem>
            );
          })}
        </StyledSelect>
      </StyledFormControl>
    </div>
  );
};

export default MechData;
