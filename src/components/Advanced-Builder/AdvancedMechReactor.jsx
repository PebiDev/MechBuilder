import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const AdvancedMechReactor = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);

  const handleReactorSelect = (event) => {
    const reactorType = event.target.value;
    if (reactorType === "XL" || reactorType === "Light") {
      let slots = ["loc1", "loc2"];
      if (mech.technologyBase === "Inner Sphere" && reactorType === "XL") {
        slots.push("loc3");
      }
      dispatch(
        mechActions.unInstallEquipFromZone({
          zones: ["rtorso", "ltorso"],
          slots: slots,
        })
      );
    }

    dispatch(mechActions.setReactorType(event.target.value));
  };

  return (
    <div id="advanced-mech-reactor">
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel id="select-reactor-label">Choose Reactor</InputLabel>
        <Select
          labelId="select-reactor-label"
          id="select-reactor"
          label="Choose Reactor"
          value={mech.reactor.reactorType}
          onChange={handleReactorSelect}
        >
          <MenuItem value="Standard">Standard</MenuItem>
          <MenuItem value="XL">XL Engine</MenuItem>
          {mech.technologyBase === "Inner Sphere" && (
            <MenuItem value="Compact">Compact Engine</MenuItem>
          )}
          {mech.technologyBase === "Inner Sphere" && (
            <MenuItem value="Light">Light Engine</MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default AdvancedMechReactor;
