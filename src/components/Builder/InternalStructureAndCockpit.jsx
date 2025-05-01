import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { FormControl, InputLabel, MenuItem, Select, Box } from "@mui/material";

const InternalStructureAndCockpit = () => {
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const internalStructureHandler = (event) => {
    dispatch(mechActions.setInternalStructure(event.target.value));
  };
  const cockpitHandler = (event) => {
    const cockpitType = event.target.value;
    if (cockpitType === "Standard Cockpit") {
      dispatch(
        mechActions.unInstallEquipFromZone({ zones: ["head"], slots: ["loc6"] })
      );
    }

    dispatch(mechActions.setCockpit(cockpitType));
  };

  return (
    <div id="mech-structure" className="form-element">
      {ui.advancedOptions ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="300px"
        >
          <FormControl sx={{ m: 1, minWidth: 180 }}>
            <InputLabel id="select-internal-label">
              Select Internal Structure
            </InputLabel>
            <Select
              labelid="select-internal-label"
              id="select-internal"
              label="Select Internal Structure"
              value={mech.internalStructure}
              onChange={internalStructureHandler}
              style={{ minWidth: 120 }}
            >
              <MenuItem value="Standard">Standard</MenuItem>
              <MenuItem value="Endo Steel">Endo Steel</MenuItem>
            </Select>
          </FormControl>
          {mech.internalStructure === "Standard" ? (
            <span className="substract-tons">
              -{mech.armor.internal.standardton} tons
            </span>
          ) : (
            <span className="substract-tons">
              -{mech.armor.internal.endosteel} tons
            </span>
          )}
        </Box>
      ) : (
        <p>
          Internal Structure: {mech.internalStructure}{" "}
          <span className="substract-tons">
            -{mech.armor.internal.standardton} tons
          </span>
        </p>
      )}
      {ui.advancedOptions && mech.technologyBase === "Inner Sphere" ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="300px"
        >
          <FormControl sx={{ m: 1, minWidth: 180 }}>
            <InputLabel id="select-cockpit-label">Select Cockpit</InputLabel>
            <Select
              labelid="select-cockpit-label"
              id="select-cockpit"
              label="Select Cockpit"
              value={mech.cockpit.type}
              onChange={cockpitHandler}
              style={{ minWidth: 120 }}
            >
              <MenuItem value="Standard Cockpit">Standard Cockpit</MenuItem>
              <MenuItem value="Small Cockpit">Small Cockpit</MenuItem>
            </Select>
          </FormControl>
          <span className="substract-tons">-{mech.cockpit.weight} tons</span>
        </Box>
      ) : (
        <p>
          {mech.cockpit.type}:
          <span className="substract-tons">-{mech.cockpit.weight} tons</span>
        </p>
      )}
    </div>
  );
};

export default InternalStructureAndCockpit;
