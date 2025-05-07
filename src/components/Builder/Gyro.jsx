import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const Gyro = () => {
  const dispatch = useDispatch();

  const gyroType = useSelector((state) => state.mech.gyro.type);
  const gyroWeight = useSelector((state) => state.mech.gyro.weight);
  const techBase = useSelector((state) => state.mech.technologyBase);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const handleGyroSelect = (event) => {
    const selectedType = event.target.value;

    if (selectedType === "Compact") {
      dispatch(
        mechActions.unInstallEquipFromZone({
          zones: ["ctorso"],
          slots: ["loc6", "loc7"],
        })
      );
    } else if (selectedType === "Extra-Light") {
      dispatch(
        mechActions.unInstallEquipFromZone({
          zones: ["ctorso"],
          slots: ["loc11", "loc12"],
        })
      );
    }

    dispatch(mechActions.setGyro(selectedType));
  };

  return (
    <div id="mech-gyro" className="form-element">
      {techBase === "Inner Sphere" && advancedOptions ? (
        <p>
          <label htmlFor="gyro-select">Choose Gyro:</label>{" "}
          <select
            id="gyro-select"
            name="gyro-select"
            value={gyroType}
            onChange={handleGyroSelect}
          >
            <option value="Standard">Standard</option>
            <option value="Heavy-Duty">Heavy-Duty</option>
            <option value="Compact">Compact</option>
            <option value="Extra-Light">Extra-Light</option>
          </select>
          <span className="substract-tons">-{gyroWeight} tons</span>
        </p>
      ) : (
        <p>
          Installing Gyro:
          <span className="substract-tons">-{gyroWeight} tons</span>
        </p>
      )}
    </div>
  );
};

export default Gyro;
