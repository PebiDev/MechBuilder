import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const FinalActions = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);

  const checkIfArmorSlotsInstalled = () => {
    const armorSlotsAreInstalled = Object.values(mech.zones).some((zone) =>
      Object.values(zone).some((entry) => entry.includes("Ferro-Fibrous"))
    );
    return armorSlotsAreInstalled;
  };

  const installEndoSteelHandler = () => {
    dispatch(mechActions.installEndoSteel(mech));
  };
  const handleInstallArmorSlots = () => {
    const installSlots = {
      name: mech.armor.armorType,
      slots: mech.armor.armorSlots,
    };

    dispatch(mechActions.InstallReRollSlots(installSlots));
  };
  const handleRemoveArmor = () => {
    dispatch(mechActions.removeAllArmorSlots(mech));
  };

  return (
    <div id="final-actions">
      {mech.internalStructure === "Endo Steel" && (
        <button onClick={installEndoSteelHandler}>Install EndoSteel</button>
      )}
      {mech.armor.armorType.includes("Ferro-Fibrous") &&
        !checkIfArmorSlotsInstalled() && (
          <button onClick={handleInstallArmorSlots}>
            Install {mech.armor.armorType} (Slots: {mech.armor.armorSlots})
          </button>
        )}
      {mech.armor.armorSlots > 0 && (
        <button onClick={handleRemoveArmor}>Remove ArmorSlots</button>
      )}
    </div>
  );
};

export default FinalActions;
