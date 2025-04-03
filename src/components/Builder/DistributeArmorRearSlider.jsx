import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useState } from "react";

const DistributeArmorRearSlider = ({ zone, rearzone }) => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  let maxArmor = mech.armor.internal[zone] * 2;

  const checkOverArmored = (armorpoints) => {
    let ArmorPointsToAdd = armorpoints;

    if (ArmorPointsToAdd > mech.armor.unassignedpoints) {
      ArmorPointsToAdd = armorpoints - mech.armor.unassignedpoints;
    }
    return ArmorPointsToAdd;
  };

  const frontSlideHandler = (event) => {
    let sliderArmor = checkOverArmored(Number(event.target.value));

    if (sliderArmor + mech.armor.armorvalue[rearzone] > maxArmor) {
      const newRearArmorValue = maxArmor - sliderArmor;

      dispatch(
        mechActions.addArmorValueToZone({
          zone: rearzone,
          armorpoints: newRearArmorValue,
        })
      );
    }
    dispatch(
      mechActions.addArmorValueToZone({
        zone: zone,
        armorpoints: sliderArmor,
      })
    );
  };

  const rearSlideHandler = (event) => {
    let rearArmor = checkOverArmored(Number(event.target.value));

    if (mech.armor.armorvalue[zone] + rearArmor > maxArmor) {
      let newFrontArmorValue = maxArmor - rearArmor;

      dispatch(
        mechActions.addArmorValueToZone({
          zone: zone,
          armorpoints: newFrontArmorValue,
        })
      );
    }
    dispatch(
      mechActions.addArmorValueToZone({
        zone: rearzone,
        armorpoints: rearArmor,
      })
    );
  };

  return (
    <div className="dist-armor-slider">
      <span>
        Choose Armor for {zone}: {mech.armor.armorvalue[zone]} ({maxArmor})
      </span>
      <input
        type="range"
        min="0"
        max={maxArmor}
        className="slider"
        value={mech.armor.armorvalue[zone]}
        onInput={frontSlideHandler}
      ></input>

      <br />
      <span>
        Choose Armor for {rearzone}: {mech.armor.armorvalue[rearzone]} (
        {maxArmor})
      </span>
      <input
        type="range"
        min="0"
        max={maxArmor}
        className="slider"
        value={mech.armor.armorvalue[rearzone]}
        onInput={rearSlideHandler}
      ></input>
    </div>
  );
};

export default DistributeArmorRearSlider;
