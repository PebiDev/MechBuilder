import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const DistributeArmorManually = () => {
  const unassignedPoints = useSelector(
    (state) => state.mech.armor.unassignedPoints
  );
  const armorFactor = useSelector((state) => state.mech.armor.armorFactor);
  const zoneArmor = useSelector((state) => state.mech.armor.armorValue[zone]);
  const internal = useSelector((state) => state.mech.armor.internal[zone]);
  return <></>;
};

export default DistributeArmorManually;
