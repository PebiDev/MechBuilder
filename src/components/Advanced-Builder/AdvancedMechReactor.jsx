import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
} from "@mui/material";

const AdvancedMechReactor = () => {
  const dispatch = useDispatch();

  const reactorType = useSelector((state) => state.mech.reactor.reactorType);
  const technologyBase = useSelector((state) => state.mech.technologyBase);

  const handleReactorSelect = (event) => {
    const selectedType = event.target.value;

    if (selectedType === "XL" || selectedType === "Light") {
      const slots = ["loc1", "loc2"];
      if (technologyBase === "Inner Sphere" && selectedType === "XL") {
        slots.push("loc3");
      }
      dispatch(
        mechActions.unInstallEquipFromZone({
          zones: ["rtorso", "ltorso"],
          slots,
        })
      );
    }

    dispatch(mechActions.setReactorType(selectedType));
  };

  return (
    <div id="advanced-mech-reactor">
      <FormControl sx={{ m: 1, minWidth: 150 }}>
        <InputLabel
          htmlFor="select-reactor-outlined-input"
          id="select-reactor-label"
        >
          Choose Reactor
        </InputLabel>
        <Select
          labelId="select-reactor-label"
          id="select-reactor"
          label="Choose Reactor"
          value={reactorType}
          onChange={handleReactorSelect}
          input={
            <OutlinedInput
              id="select-reactor-outlined-input"
              label="Choose Reactor"
              aria-labelledby="select-reactoe-label"
            />
          }
        >
          <MenuItem id="standard-reactor" value="Standard">
            Standard
          </MenuItem>
          <MenuItem id="xl-engine" value="XL">
            XL Engine
          </MenuItem>
          {technologyBase === "Inner Sphere" && (
            <MenuItem id="compact-engine" value="Compact">
              Compact Engine
            </MenuItem>
          )}
          {technologyBase === "Inner Sphere" && (
            <MenuItem id="light-engine" value="Light">
              Light Engine
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default AdvancedMechReactor;
