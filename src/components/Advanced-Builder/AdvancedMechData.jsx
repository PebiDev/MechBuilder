import { useDispatch, useSelector } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { RadioGroup, Radio } from "@mui/material";
import {
  StyledFormControl,
  StyledFormLabel,
  StyledFormControlLabel,
} from "../StyledComponents";
import React from "react";

const AdvancedMechData = () => {
  const dispatch = useDispatch();

  const technologyBase = useSelector((state) => state.mech.technologyBase);
  const chassisType = useSelector((state) => state.mech.chassisType);

  const handleTechBaseRadio = (event) => {
    dispatch(mechActions.setTechnologyBase(event.target.value));
  };

  const handleChassisTypeRadio = (event) => {
    dispatch(mechActions.setChassisType(event.target.value));
  };

  return (
    <>
      <div id="tech-base-radio">
        <StyledFormControl component="fieldset">
          <StyledFormLabel cmponent="legend" id="techbase-radio-group">
            Choose Technology Base
          </StyledFormLabel>
          <RadioGroup
            row
            aria-labelledby="techbase-radio-group"
            name="techbase-radio-group"
            onChange={handleTechBaseRadio}
            value={technologyBase}
          >
            <StyledFormControlLabel
              value="Inner Sphere"
              control={<Radio />}
              label="Inner Sphere"
            />
            <StyledFormControlLabel
              value="Clan"
              control={<Radio />}
              label="Clan"
            />
          </RadioGroup>
        </StyledFormControl>
      </div>

      <div id="chassis-type-radio">
        <StyledFormControl>
          <StyledFormLabel id="chassistype-radio-group">
            Choose Chassis Type
          </StyledFormLabel>
          <RadioGroup
            row
            aria-labelledby="chassistype-radio-group"
            name="chassistype-radio-group"
            onChange={handleChassisTypeRadio}
            value={chassisType}
          >
            <StyledFormControlLabel
              value="Bipedal"
              control={<Radio />}
              label="Bipedal"
            />
            <StyledFormControlLabel
              value="Quad"
              control={<Radio />}
              label="Quad"
            />
          </RadioGroup>
        </StyledFormControl>
      </div>
    </>
  );
};

export default React.memo(AdvancedMechData);
