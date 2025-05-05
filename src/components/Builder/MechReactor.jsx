import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import AdvancedMechReactor from "../Advanced-Builder/AdvancedMechReactor";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useMemo } from "react";

const MechReactor = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);

  let reactorValue = 0;
  const speedOptions = [];
  let walkingSpeedMP = 1;

  if (mech.tonnage > 0) {
    while (reactorValue < 401) {
      reactorValue = mech.tonnage * walkingSpeedMP;
      if (reactorValue < 401) {
        speedOptions[walkingSpeedMP - 1] = reactorValue;
      }
      walkingSpeedMP++;
    }
  }

  const menuItems = useMemo(
    () =>
      speedOptions.map((walkSpeed, index) => {
        return (
          <MenuItem key={walkSpeed} value={index + 1}>
            {index + 1}
          </MenuItem>
        );
      }),
    [speedOptions]
  );
  const speedHandler = (event) => {
    dispatch(mechActions.addReactor(event.target.value));
  };

  return (
    <div id="mech-reactor" className="form-element">
      <FormControl fullWidth>
        <InputLabel id="select-speed-label">Choose Walking Speed</InputLabel>
        <Select
          labelId="select-speed-label"
          id="select-speed"
          label="Choose Walking Speed"
          value={mech.movement.walking}
          onChange={speedHandler}
        >
          {menuItems}
        </Select>
      </FormControl>

      {mech.movement.walking > 0 && (
        <>
          {ui.advancedOptions && <AdvancedMechReactor />}
          <p>
            Installing Reactor: {mech.reactor.reactorType}{" "}
            {mech.reactor.reactorValue}
            <br />
            <span className="substract-tons">
              -
              {mech.reactor.reactorType === "XL"
                ? mech.reactor.xlTons
                : mech.reactor.reactorType === "Light"
                ? mech.reactor.light
                : mech.reactor.reactorType === "Compact"
                ? mech.reactor.compact
                : mech.reactor.standardTons}{" "}
              tons
            </span>
          </p>
        </>
      )}
    </div>
  );
};

export default MechReactor;
