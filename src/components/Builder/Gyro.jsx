import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const Gyro = () => {
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const handleGyroSelect = (event) => {
    const gyroType = event.target.value;
    if (gyroType === "Compact") {
      dispatch(
        mechActions.unInstallEquipFromZone({
          zones: ["ctorso"],
          slots: ["loc6", "loc7"],
        })
      );
    }
    if (gyroType === "Extra Light") {
      dispatch(
        mechActions.unInstallEquipFromZone({
          zones: ["ctorso"],
          slots: ["loc11", "loc12"],
        })
      );
    }

    dispatch(mechActions.setGyro(gyroType));
  };

  return (
    <div id="mech-gyro" className="form-element">
      {mech.technologyBase === "Inner Sphere" && ui.advancedOptions ? (
        <>
          <p>
            <label htmlFor="gyro-select">Choose Gyro:</label>{" "}
            <select
              id="gyro-select"
              name="gyro-select"
              value={mech.gyro.type}
              onChange={handleGyroSelect}
            >
              <option value="Standard">Standard</option>
              <option value="Heavy-Duty">Heavy-Duty</option>
              <option value="Compact">Compact</option>
              <option value="Extra-Light">Extra-Light</option>
            </select>
            <span className="substract-tons">-{mech.gyro.weight} tons</span>
          </p>
        </>
      ) : (
        <>
          {" "}
          <p>
            Installing Gyro:
            <span className="substract-tons">-{mech.gyro.weight} tons</span>
          </p>
        </>
      )}
    </div>
  );
};

export default Gyro;
