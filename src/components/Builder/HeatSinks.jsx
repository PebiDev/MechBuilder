import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const HeatSinks = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const heatSinkHandler = (event) => {
    dispatch(mechActions.addHeatsinks(event.target.value));
  };
  const heatSinkOptions = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23,
  ];
  return (
    <div id="mech-heatsinks">
      <label htmlFor="heatsink-select">Choose additional Heatsinks</label>
      <select
        name="heatsink-select"
        id="heatsink-select"
        onChange={heatSinkHandler}
      >
        {heatSinkOptions.map((heatsink, index) => {
          return <option key={heatsink}>{index}</option>;
        })}
      </select>
      {mech.heatsinks.number > 10 && (
        <p>
          Installing {mech.heatsinks.number - 10} additional Heatsinks:
          <span className="substract-tons">
            -{mech.heatsinks.number - 10} tons
          </span>
        </p>
      )}
    </div>
  );
};

export default HeatSinks;
