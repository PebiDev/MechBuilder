import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import React from "react";

const DistributeArmorSlider = ({ zone }) => {
  const dispatch = useDispatch();

  const zoneArmor = useSelector((state) => state.mech.armor.armorValue[zone]);
  const internal = useSelector((state) => state.mech.armor.internal[zone]);
  const unassignedPoints = useSelector(
    (state) => state.mech.armor.unassignedPoints
  );

  const maxArmor = zone === "head" ? 9 : internal * 2;

  const zoneSlideHandler = (event) => {
    const desired = Number(event.target.value);

    // Prevent assigning more than allowed
    const totalAvailable = zoneArmor + unassignedPoints;
    const clampedValue = Math.min(desired, totalAvailable);

    dispatch(
      mechActions.addArmorValueToZone({
        zone,
        armorpoints: clampedValue,
      })
    );
  };

  return (
    <div className="dist-armor-slider">
      <span>
        Choose Armor for {zone}: {zoneArmor} / {maxArmor}
      </span>
      <input
        type="range"
        min="0"
        max={maxArmor}
        className="slider"
        value={zoneArmor}
        onInput={zoneSlideHandler}
      />
    </div>
  );
};

export default React.memo(DistributeArmorSlider);
