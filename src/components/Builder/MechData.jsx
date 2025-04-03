import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const MechData = () => {
  const mechTonnage = [
    20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100,
  ];

  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

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
      <label htmlFor="mechTonnage">Select Mech Tonnage</label>
      <select
        value={mech.tonnage}
        name="mechTonnage"
        id="mechTonnage"
        onChange={mechTonnageHandler}
      >
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
