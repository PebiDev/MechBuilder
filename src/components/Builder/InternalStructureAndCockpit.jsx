import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

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
    <div id="mech-structure">
      {ui.advancedOptions ? (
        <p>
          <label htmlFor="internal-structure-select">Internal Structure:</label>
          <select
            id="internal-structure-select"
            name="internal-structure-select"
            value={mech.internalStructure}
            onChange={internalStructureHandler}
          >
            <option>Standard</option>
            <option>Endo Steel</option>
          </select>
          {mech.internalStructure === "Standard" ? (
            <span className="substract-tons">
              -{mech.armor.internal.standardton} tons
            </span>
          ) : (
            <span className="substract-tons">
              -{mech.armor.internal.endosteel} tons
            </span>
          )}
        </p>
      ) : (
        <p>
          Internal Structure: {mech.internalStructure}{" "}
          <span className="substract-tons">
            -{mech.armor.internal.standardton} tons
          </span>
        </p>
      )}
      {ui.advancedOptions && mech.technologyBase === "Inner Sphere" ? (
        <p>
          <label htmlFor="cockpit-select">Cockpit: </label>
          <select
            id="cockpit-select"
            name="cockpit-select"
            onChange={cockpitHandler}
          >
            <option>Standard Cockpit</option>
            <option>Small Cockpit</option>
          </select>
          <span className="substract-tons">-{mech.cockpit.weight} tons</span>
        </p>
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
