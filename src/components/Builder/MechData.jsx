import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import AdvancedMechData from "../Advanced-Builder/AdvancedMechData";
import { MenuItem, TextField, InputLabel, OutlinedInput } from "@mui/material";
import { StyledSelect, StyledFormControl } from "../StyledComponents";
import { useMemo } from "react";

const MechData = () => {
  const dispatch = useDispatch();

  const mechName = useSelector((state) => state.mech.name);
  const mechTonnage = useSelector((state) => state.mech.tonnage);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const nameHandler = (event) => {
    dispatch(mechActions.setName(event.target.value));
  };

  const mechTonnageHandler = (event) => {
    dispatch(mechActions.setMechTonnage(event.target.value));
  };

  const tonnageOptions = useMemo(() => {
    const options = [
      20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
    ];
    return options.map((tonnage) => (
      <MenuItem key={tonnage} value={tonnage} id={tonnage}>
        {tonnage}
      </MenuItem>
    ));
  }, []);

  return (
    <div className="mech-data form-element">
      <TextField
        id="mech-name-textfield"
        name="mech-name-textfield"
        label="Name your Mech"
        value={mechName}
        onChange={nameHandler}
        variant="outlined"
        className="name-textfield"
      />
      <br />
      {advancedOptions && <AdvancedMechData />}
      <br />
      <StyledFormControl>
        <InputLabel
          id="select-mech-tonnage-label"
          htmlFor="select-mech-tonnage-outlined-input"
        >
          Select Mech Tonnage
        </InputLabel>
        <StyledSelect
          labelId="select-mech-tonnage-label"
          id="select-mech-tonnage"
          name="select-mech-tonnage"
          value={mechTonnage}
          label="Select Mech Tonnage"
          onChange={mechTonnageHandler}
          input={
            <OutlinedInput
              id="select-mech-tonnage-outlined-input"
              label="Select Mech Tonnage"
              aria-labelledby="select-mech-tonnage-label"
            />
          }
        >
          {tonnageOptions}
        </StyledSelect>
      </StyledFormControl>
    </div>
  );
};

export default MechData;
