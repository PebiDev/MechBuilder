import { useSelector, useDispatch } from "react-redux";
import {
  FormGroup,
  FormLabel,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { mechActions } from "../../store/mech-slice";

const AdvancedRemoveHand = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const handleActuatorChange = (arm, actuator) => {
    const zone = [arm];
    const slots = ["loc3", "loc4"];
    dispatch(mechActions.unInstallEquipFromZone({ zones: zone, slots }));
    dispatch(mechActions.setArmActuators({ arm, actuator }));
  };

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 6 }}>
        <FormGroup>
          <FormLabel sx={{ color: "#ffa726" }} id="remove-hands-select-label">
            UnInstall Right Arm Actuators
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={mech.zones.rarm.loc4 === "Hand Actuator"}
                onChange={() => handleActuatorChange("rarm", "Hand Actuator")}
              />
            }
            label="Right Hand Actuator"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={mech.zones.rarm.loc3 === "Lower Arm Actuator"}
                onChange={() =>
                  handleActuatorChange("rarm", "Lower Arm Actuator")
                }
              />
            }
            label="Right Lower Arm Actuator"
          />
        </FormGroup>
      </Grid>
      <Grid size={{ xs: 6 }}>
        <FormGroup>
          <FormLabel sx={{ color: "#ffa726" }} id="remove-hands-select-label">
            UnInstall Left Arm Actuators
          </FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                checked={mech.zones.larm.loc4 === "Hand Actuator"}
                onChange={() => handleActuatorChange("larm", "Hand Actuator")}
              />
            }
            label="Left Hand Actuator"
          />{" "}
          <FormControlLabel
            control={
              <Checkbox
                checked={mech.zones.larm.loc3 === "Lower Arm Actuator"}
                onChange={() =>
                  handleActuatorChange("larm", "Lower Arm Actuator")
                }
              />
            }
            label="Left Lower Arm Actuator"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default AdvancedRemoveHand;
