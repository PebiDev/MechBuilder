import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import AdvancedMechData from "../Advanced-Builder/AdvancedMechData";

const MechData = () => {
  const mechTonnage = [
    20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  ];

  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);
  const tonnageFromRedux = useSelector((state) => state.mech.tonnage);

  const nameHandler = (event) => {
    dispatch(mechActions.setName(event.target.value));
  };

  const mechTonnageHandler = (event) => {
    dispatch(mechActions.setMechTonnage(event.target.value));
  };
  return (
    <div className="mechData">
      <label htmlFor="name">Name your Mech</label>
      <input type="text" id="name" name="name" onChange={nameHandler}></input>
      <br />
      {ui.advancedOptions && <AdvancedMechData />}
      <br />
      <label htmlFor="mechTonnage">Select Mech Tonnage</label>
      <select
        value={tonnageFromRedux}
        name="mechTonnage"
        id="mechTonnage"
        onChange={mechTonnageHandler}
      >
        <option value="" disabled>
          Select Tonnage
        </option>
        {mechTonnage.map((tonnage) => {
          return (
            <option key={tonnage} value={tonnage}>
              {tonnage}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default MechData;
