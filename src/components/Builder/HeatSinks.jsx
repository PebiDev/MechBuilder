import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useMemo } from "react";

const HeatSinks = () => {
  const dispatch = useDispatch();

  const heatsinkType = useSelector((state) => state.mech.heatsinks.type);
  const heatsinkNumber = useSelector((state) => state.mech.heatsinks.number);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const heatSinkOptions = useMemo(
    () => Array.from({ length: 24 }, (_, i) => i),
    []
  );

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
        <div id="heatsink-type-radio">
          <p>Choose Heatsink Type:</p>
          <input
            type="radio"
            id="heatsink-type-standard"
            name="heatsink-type"
            value="standard"
            checked={heatsinkType === "standard"}
            onChange={handleHeatsinkTypeChange}
          />
          <label htmlFor="heatsink-type-standard">Standard</label>
          <input
            type="radio"
            id="heatsink-type-double"
            name="heatsink-type"
            value="double"
            checked={heatsinkType === "double"}
            onChange={handleHeatsinkTypeChange}
          />
          <label htmlFor="heatsink-type-double">Double</label>
        </div>
      )}

      <label htmlFor="heatsink-select">Choose Additional Heatsinks</label>
      <select
        name="heatsink-select"
        id="heatsink-select"
        onChange={handleHeatSinkChange}
        value={heatsinkNumber}
      >
        {heatSinkOptions.map((count) => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select>

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
