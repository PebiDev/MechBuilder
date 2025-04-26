import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const FinalActions = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);

  const installEndoSteelHandler = () => {
    dispatch(mechActions.installEndoSteel(mech));
  };
  const handleRemoveArmor = () => {
    dispatch(mechActions.removeAllArmorSlots(mech));
  };
  return (
    <div id="final-actions">
      {mech.internalStructure === "Endo Steel" && (
        <button onClick={installEndoSteelHandler}>Install EndoSteel</button>
      )}
      {mech.armor.armorSlots > 0 && (
        <button onClick={handleRemoveArmor}>Remove ArmorSlots</button>
      )}
    </div>
  );
};

export default FinalActions;
