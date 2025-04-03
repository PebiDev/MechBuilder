import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const MechReactor = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  // getting Mech Speedoptions
  let reactorValue = 0;
  const speedOptions = [];
  let walkingSpeedMP = 1;

  if (mech.tonnage > 0) {
    //const reactorMaxWeight = mech.tonnage - 3 - Math.round(mech.tonnage / 10);

    while (reactorValue < 401) {
      reactorValue = mech.tonnage * walkingSpeedMP;

      //let reactor = reactorValues.find((e) => e.reactorValue == reactorValue);
      //console.log(`reactor weight: ${reactor.standardTons}`);
      //if (reactorValue < 401 && reactorMaxWeight > reactor.standardTons) {
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
        <p>
          Installing Reactor:
          <br />
          {mech.reactor.reactorType === "standard"
            ? "Fusion Engine"
            : "XL Engine"}{" "}
          {mech.reactor.reactorValue}{" "}
          <span className="substract-tons">
            -{mech.reactor.standardTons} tons
          </span>
        </p>
      )}
    </div>
  );
};

export default MechReactor;
