import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const DistributeArmorSlider = ({ zone }) => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  let maxArmor = mech.armor.internal[zone] * 2;
  if (zone == "head") {
    maxArmor = 9;
  }

  const checkOverArmored = (armorpoints) => {
    let ArmorPointsToAdd = armorpoints;

    if (ArmorPointsToAdd > mech.armor.unassignedPoints) {
      ArmorPointsToAdd = armorpoints - mech.armor.unassignedPoints;
    }
    return ArmorPointsToAdd;
  };

  const zoneSlideHandler = (event) => {
    const sliderArmor = checkOverArmored(Number(event.target.value));
    const armorZone = zone;

    dispatch(
      mechActions.addArmorValueToZone({
        zone: armorZone,
        armorpoints: sliderArmor,
      })
    );
  };

  return (
    <div className="dist-armor-slider">
      <span>
        Choose Armor for {zone}: {mech.armor.armorValue[zone]} ({maxArmor})
      </span>
      <input
        type="range"
        min="0"
        max={maxArmor}
        className="slider"
        value={mech.armor.armorValue[zone]}
        onInput={zoneSlideHandler}
      ></input>
    </div>
  );
};

export default DistributeArmorSlider;
