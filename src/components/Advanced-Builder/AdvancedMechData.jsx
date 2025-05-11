import { useDispatch, useSelector } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { RadioGroup, Radio, Tooltip } from "@mui/material";
import {
  StyledFormControl,
  StyledFormLabel,
  StyledFormControlLabel,
} from "../StyledComponents";
import React from "react";
import { tooltips } from "../constants/tooltips.tsx";

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
    <section aria-label="Mech Configuration">
      <div id="tech-base-radio">
        <StyledFormControl component="fieldset">
          <StyledFormLabel component="legend" id="techbase-radio-group">
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
              label={
                <Tooltip title={tooltips.techBase.innerSphere}>
                  <span>Inner Sphere</span>
                </Tooltip>
              }
            />
            <StyledFormControlLabel
              value="Clan"
              control={<Radio />}
              label={
                <Tooltip title={tooltips.techBase.clan}>
                  <span>Clan</span>
                </Tooltip>
              }
            />
          </RadioGroup>
        </StyledFormControl>
      </div>

      <div id="chassis-type-radio">
        <StyledFormControl component="fieldset">
          <StyledFormLabel id="chassistype-radio-group" component="legend">
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
              label={
                <Tooltip title={tooltips.chassisType.bipedal}>
                  <span>Bipedal</span>
                </Tooltip>
              }
            />
            <StyledFormControlLabel
              value="Quad"
              control={<Radio />}
              label={
                <Tooltip title={tooltips.chassisType.quad}>
                  <span>Quad</span>
                </Tooltip>
              }
            />
          </RadioGroup>
        </StyledFormControl>
      </div>
    </section>
  );
};

export default React.memo(AdvancedMechData);
