import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useState, useMemo } from "react";
import { RadioGroup, Radio, MenuItem, InputLabel } from "@mui/material";
import {
  StyledFormControl,
  StyledFormLabel,
  StyledFormControlLabel,
  StyledSelect,
} from "../StyledComponents";

const JumpJets = () => {
  const dispatch = useDispatch();

  const walkingSpeed = useSelector((state) => state.mech.movement.walking);
  const runningSpeed = useSelector((state) => state.mech.movement.running);
  const jumping = useSelector((state) => state.mech.movement.jumping);
  const jumpJetWeight =
    useSelector((state) => state.mech.equipment.jumpjets?.[0]?.tons) || 0;
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);
  const [jumpJetType, setJumpJetType] = useState("Standard");

  const jumpOptions = useMemo(() => {
    const options = [];
    const maxJump = jumpJetType === "Improved" ? runningSpeed : walkingSpeed;

    const minJump = jumpJetType === "Improved" ? walkingSpeed + 1 : 0;

    for (let i = minJump; i <= maxJump; i++) {
      options.push(i);
    }

    return options.map((jumpJet) => (
      <MenuItem key={jumpJet} value={jumpJet}>
        {jumpJet}
      </MenuItem>
    ));
  }, [jumpJetType, walkingSpeed, runningSpeed]);

  const handleJumpJetSelect = (event) => {
    dispatch(
      mechActions.addJumpJets({
        numberOfJumpJets: Number(event.target.value),
        jumpJetType,
      })
    );
  };

  const improvedJumpJetHandler = (event) => {
    const selectedType = event.target.value;
    setJumpJetType(selectedType);
    dispatch(mechActions.removeJumpJets());
  };

  return (
    <div id="mech-jumpjets" className="form-element">
      {advancedOptions && (
        <StyledFormControl component="fieldset">
          <StyledFormLabel component="legend" id="jumpjet-radio-group">
            Choose Jumpjet Type
          </StyledFormLabel>
          <RadioGroup
            row
            aria-labelledby="jumpjet-radio-group"
            name="jumpjet-radio-group"
            value={jumpJetType}
            onChange={improvedJumpJetHandler}
          >
            <StyledFormControlLabel
              value="Standard"
              control={<Radio />}
              label="Standard"
            ></StyledFormControlLabel>
            <StyledFormControlLabel
              value="Improved"
              control={<Radio />}
              label="Improved"
            ></StyledFormControlLabel>
          </RadioGroup>
        </StyledFormControl>
      )}
      <br />
      <StyledFormControl>
        <InputLabel id="select-jumpjet-label">
          Choose Jump Capability
        </InputLabel>
        <StyledSelect
          labelId="select-jumpjet-label"
          name="select-jumpjet"
          id="select-jumpjet"
          value={jumping}
          onChange={handleJumpJetSelect}
        >
          {jumpOptions}
        </StyledSelect>
      </StyledFormControl>

      {/* <label htmlFor="jumpjet-select">Choose Jump Capability</label>
      <select
        id="jumpjet-select"
        name="jumpjet-select"
        value={jumping}
        onChange={handleJumpJetSelect}
      >
        {jumpOptions.map((jumpSpeed) => (
          <option key={jumpSpeed} value={jumpSpeed}>
            {jumpSpeed}
          </option>
        ))}
      </select> */}

      {jumping > 0 && (
        <p>
          Installing Jumpjets: {jumping}
          <span className="substract-tons">
            -{jumping * jumpJetWeight} tons
          </span>
        </p>
      )}
    </div>
  );
};

export default JumpJets;
