import { useDispatch, useSelector } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@mui/material";

const AdvancedMechData = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const handleTechBaseRadio = (event) => {
    dispatch(mechActions.setTechnologyBase(event.target.value));
  };

  const handleChassisTypeRadio = (event) => {
    dispatch(mechActions.setChassisType(event.target.value));
  };

  return (
    <>
      <div id="tech-base-radio">
        <FormControl>
          <FormLabel id="techbase-radio-group" style={{ color: "#ffa726" }}>
            Choose Technology Base
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="techbase-radio-group"
            name="techbase-radio-group"
            onChange={handleTechBaseRadio}
            value={mech.technologyBase}
          >
            <FormControlLabel
              value="Inner Sphere"
              control={<Radio />}
              label="Inner Sphere"
            />
            <FormControlLabel value="Clan" control={<Radio />} label="Clan" />
          </RadioGroup>
        </FormControl>
      </div>
      <div id="chassis-type-radio">
        <FormControl>
          <FormLabel id="chassistype-radio-group" style={{ color: "#ffa726" }}>
            Choose Chassis Type
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="chassistype-radio-group"
            name="chassistype-radio-group"
            onChange={handleChassisTypeRadio}
            value={mech.chassisType}
          >
            <FormControlLabel
              value="Bipedal"
              control={<Radio />}
              label="Bipedal"
            />
            <FormControlLabel value="Quad" control={<Radio />} label="Quad" />
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};

export default AdvancedMechData;
