import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useMemo } from "react";
import { RadioGroup, Radio, InputLabel, MenuItem } from "@mui/material";
import {
  StyledFormControl,
  StyledFormLabel,
  StyledFormControlLabel,
  StyledSelect,
} from "../StyledComponents";

const HeatSinks = () => {
  const dispatch = useDispatch();

  const heatsinkType = useSelector((state) => state.mech.heatsinks.type);
  const heatsinkNumber = useSelector((state) => state.mech.heatsinks.number);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const heatSinkOptions = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => (
      <MenuItem key={i} value={i}>
        {i}
      </MenuItem>
    ));
  }, []);

  const handleHeatSinkChange = (event) => {
    dispatch(mechActions.addHeatsinks(Number(event.target.value)));
  };

  const handleHeatsinkTypeChange = (event) => {
    dispatch(mechActions.setHeatsinkType(event.target.value));
  };

  const additionalHeatsinks = useMemo(() => {
    return Math.max(0, heatsinkNumber - 10);
  }, [heatsinkNumber]);

  return (
    <div id="mech-heatsinks" className="form-element">
      {advancedOptions && (
        <StyledFormControl component="fieldset">
          <StyledFormLabel component="legend" id="heatsink-radio-group">
            Choose Heatsink Type
          </StyledFormLabel>

          <RadioGroup
            row
            aria-labelledby="heatsink-radio-group"
            name="heatsink-radio-group"
            onChange={handleHeatsinkTypeChange}
            value={heatsinkType}
          >
            <StyledFormControlLabel
              value="standard"
              control={<Radio />}
              label="Standard"
            />
            <StyledFormControlLabel
              value="double"
              control={<Radio />}
              label="Double"
            />
          </RadioGroup>
        </StyledFormControl>
      )}
      <br></br>
      <StyledFormControl>
        <InputLabel id="select-additional-heatsinks-label">
          Choose Additional Heatsinks
        </InputLabel>
        <StyledSelect
          labelId="select-additional-heatsinks-label"
          name="heatsink-select"
          id="heatsink-select"
          onChange={handleHeatSinkChange}
          value={heatsinkNumber - 10}
        >
          {heatSinkOptions}
        </StyledSelect>
      </StyledFormControl>
      {/* <label htmlFor="heatsink-select">Choose Additional Heatsinks</label> */}
      {/* <select
      
      >
        {heatSinkOptions.map((count) => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select> */}

      {additionalHeatsinks > 0 && (
        <p>
          Installing {additionalHeatsinks} additional Heatsinks:
          <span className="substract-tons">-{additionalHeatsinks} tons</span>
        </p>
      )}
    </div>
  );
};

export default HeatSinks;
