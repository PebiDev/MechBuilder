import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const DistributeArmorRearSlider = ({ zone, rearzone }) => {
  const dispatch = useDispatch();
  const armor = useSelector((state) => state.mech.armor);

  const maxArmor = useMemo(
    () => armor.internal[zone] * 2,
    [armor.internal, zone]
  );

  const checkOverArmored = (points) => Math.min(points, armor.unassignedPoints);

  const frontSlideHandler = (event) => {
    const frontValue = checkOverArmored(Number(event.target.value));
    const rearValue = Math.min(
      maxArmor - frontValue,
      armor.armorValue[rearzone]
    );

    dispatch(
      mechActions.addArmorValueToZone({ zone, armorpoints: frontValue })
    );
    dispatch(
      mechActions.addArmorValueToZone({
        zone: rearzone,
        armorpoints: rearValue,
      })
    );
  };

  const rearSlideHandler = (event) => {
    const rearValue = checkOverArmored(Number(event.target.value));
    const frontValue = Math.min(maxArmor - rearValue, armor.armorValue[zone]);

    dispatch(
      mechActions.addArmorValueToZone({
        zone: rearzone,
        armorpoints: rearValue,
      })
    );
    dispatch(
      mechActions.addArmorValueToZone({ zone, armorpoints: frontValue })
    );
  };

  return (
    <div className="dist-armor-slider">
      <span>
        Choose Armor for {zone}: {armor.armorValue[zone]} ({maxArmor})
      </span>
      <input
        type="range"
        min="0"
        max={maxArmor}
        className="slider"
        value={armor.armorValue[zone]}
        onInput={frontSlideHandler}
      />

      <br />
      <span>
        Choose Armor for {rearzone}: {armor.armorValue[rearzone]} ({maxArmor})
      </span>
      <input
        type="range"
        min="0"
        max={maxArmor}
        className="slider"
        value={armor.armorValue[rearzone]}
        onInput={rearSlideHandler}
      />
    </div>
  );
};

export default React.memo(DistributeArmorRearSlider);
