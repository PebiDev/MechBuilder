import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import AdvancedMechReactor from "../Advanced-Builder/AdvancedMechReactor";

const MechReactor = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);

  // getting Mech Speedoptions
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

  const speedHandler = (event) => {
    dispatch(mechActions.addReactor(event.target.value));
  };

  return (
    <div id="mech-reactor">
      <label htmlFor="speed-select">Choose Walking Speed</label>
      <select
        name="speed-select"
        id="speed-select"
        value={mech.movement.walking}
        onChange={speedHandler}
      >
        {speedOptions.map((walkSpeed, index) => {
          return <option key={walkSpeed}>{index + 1}</option>;
        })}
      </select>
      {mech.movement.walking > 0 && (
        <>
          {ui.advancedOptions && <AdvancedMechReactor />}
          <p>
            Installing Reactor: {mech.reactor.reactorType}{" "}
            {mech.reactor.reactorValue}
            <br />
            {/* Fusion Engine {mech.reactor.reactorValue}{" "}
              <span className="substract-tons">
                -{mech.reactor.standardTons} tons
              </span> */}
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
