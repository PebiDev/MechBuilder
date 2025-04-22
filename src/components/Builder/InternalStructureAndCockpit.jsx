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
    console.log(event.target.value);
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
      {ui.advancedOptions && mech.technologyBase === "Inner Spere" ? (
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
          Cockpit: <span className="substract-tons">-3 tons</span>
        </p>
      ) : (
        <p>
          Cockpit: <span className="substract-tons">-3 tons</span>
        </p>
      )}
    </div>
  );
};

export default InternalStructureAndCockpit;
