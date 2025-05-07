import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useCallback } from "react";

const FinalActions = () => {
  const dispatch = useDispatch();

  const zones = useSelector((state) => state.mech.zones);
  const armorType = useSelector((state) => state.mech.armor.armorType);
  const armorSlots = useSelector((state) => state.mech.armor.armorSlots);
  const internalStructure = useSelector(
    (state) => state.mech.internalStructure
  );

  const armorSlotsInstalled = Object.values(zones).some((zone) =>
    Object.values(zone).some((entry) => entry.includes("Ferro-Fibrous"))
  );

  const installEndoSteelHandler = useCallback(() => {
    dispatch(mechActions.installEndoSteel());
  }, [dispatch]);

  const handleInstallArmorSlots = useCallback(() => {
    dispatch(
      mechActions.installReRollSlotsByOli({
        name: armorType,
        slots: armorSlots,
      })
    );
  }, [dispatch, armorType, armorSlots]);

  const handleRemoveArmor = useCallback(() => {
    dispatch(mechActions.removeAllArmorSlots());
  }, [dispatch]);

  return (
    <div id="final-actions">
      {internalStructure === "Endo Steel" && (
        <button onClick={installEndoSteelHandler}>Install EndoSteel</button>
      )}
      {armorType.includes("Ferro-Fibrous") && !armorSlotsInstalled && (
        <button onClick={handleInstallArmorSlots}>
          Install {armorType} (Slots: {armorSlots})
        </button>
      )}
      {armorSlots > 0 && (
        <button onClick={handleRemoveArmor}>Remove ArmorSlots</button>
      )}
    </div>
  );
};

export default FinalActions;
