import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const FinalActions = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);

  const installEndoSteelHandler = () => {
    dispatch(mechActions.installEndoSteel(mech));
  };
  return (
    <div id="final-actions">
      {mech.internalStructure === "Endo Steel" && (
        <button onClick={installEndoSteelHandler}>Install EndoSteel</button>
      )}
    </div>
  );
};

export default FinalActions;
