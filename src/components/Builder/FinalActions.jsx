import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const FinalActions = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);

  const checkIfArmorSlotsInstalled = () => {
    let armorSlotsAreInstalled = false;
    for (const [zoneName, zone] of Object.entries(mech.zones)) {
      let slotEntries = Object.values(zone);
      armorSlotsAreInstalled = slotEntries.includes("Ferro-Fibrous");
    }
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
      {mech.armor.armorType.includes("Ferro-Fibrous") && (
        <button onClick={handleInstallArmorSlots}>
          Install {mech.armor.armorType} (Slots: {mech.armor.armorSlots})
        </button>
      )}
      {mech.armor.armorSlots > 0 && (
        <button onClick={handleRemoveArmor}>Remove ArmorSlots</button>
      )}
      {checkIfArmorSlotsInstalled() && <h1>Armor is Installed</h1>}
    </div>
  );
};

export default FinalActions;
