import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { useState } from "react";
import DistributeArmor from "./DistributeArmor";
import { uiActions } from "../../store/ui-slice";

const Armor = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);
  const maxArmor = mech.armor.internal.maxarmor;

  const sliderArmorInitialValue = () => {
    if (mech.armor.armorFactor > 0) return mech.armor.armorFactor;
    return Math.round(maxArmor / 2);
  };
  const [armorValue, setarmorValue] = useState(sliderArmorInitialValue);

  const armorOptionsStandard = [];

  const getArmorOptionsStandard = () => {
    let armorHalfTons = 0;
    for (armorHalfTons = 0; armorHalfTons < maxArmor / 8; armorHalfTons++) {
      if (armorHalfTons * 8 < maxArmor) {
        armorOptionsStandard.push({
          tons: armorHalfTons * 0.5,
          value: armorHalfTons * 8,
        });
      }
    }
    armorOptionsStandard.push({
      tons: armorHalfTons * 0.5,
      value: maxArmor,
    });
  };
  getArmorOptionsStandard();

  const armorSlideHandler = (event) => {
    const sliderArmor = Number(event.target.value);
    setarmorValue(sliderArmor);
    dispatch(mechActions.addArmor(sliderArmor));
  };

  const armorSelectHandler = (event) => {
    const selectedArmor = event.target.value.split("(tons: ")[0].trim();
    setarmorValue(selectedArmor);
    dispatch(mechActions.addArmor(Number(selectedArmor)));
  };

  const showArmorHandler = (event) => {
    dispatch(uiActions.toggleArmorVisible());
  };

  const handleArmorTypeSelect = (event) => {
    dispatch(mechActions.setArmorType(event.target.value));
  };

  return (
    <div id="armor">
      <p>
        {" "}
        armorValue: {mech.armor.armorFactor}
        <br />
        Armor Weight: {mech.armor.armorWeight} tons
        <span className="substract-tons">-{mech.armor.armorWeight} tons</span>
        {!ui.armorVisible && (
          <button type="button" onClick={showArmorHandler}>
            Show Armor
          </button>
        )}
      </p>
      <div id="armor-type">
        {ui.advancedOptions && (
          <>
            <label htmlFor="armortype-select">Choose Armor Type</label>
            <select
              id="amortype-select"
              name="amortype-select"
              value={mech.armor.armorType}
              onChange={handleArmorTypeSelect}
            >
              <option value="Standard">Standard Armor</option>
              <option value="Ferro-Fibrous">Ferro-Fibrous</option>
              {mech.technologyBase === "Inner Sphere" && (
                <>
                  <option value="Light Ferro-Fibrous">
                    Light Ferro-Fibrous
                  </option>
                  <option value="Heavy Ferro-Fibrous">
                    Heavy Ferro-Fibrous
                  </option>
                  <option value="Stealth Armor">Stealth Armor</option>
                </>
              )}
            </select>
          </>
        )}
      </div>
      {ui.armorVisible && (
        <div id="armor-distribution">
          <div id="armor-points">
            Choose Armor by Points:
            <input
              type="range"
              min="0"
              max={mech.armor.internal.maxarmor}
              className="slider"
              id="myRange"
              value={armorValue}
              onInput={armorSlideHandler}
            ></input>
            {maxArmor}
          </div>
          <div id="armor-tons">
            Choose Armor by Tons:
            <label htmlFor="armor-select"></label>
            <select
              id="armor-select"
              name="armor-select"
              onChange={armorSelectHandler}
              value={mech.armor.armorFactor}
            >
              {armorOptionsStandard.map((armorEntry) => {
                return (
                  <option key={armorEntry.tons} value={armorEntry.value}>
                    {armorEntry.value} (tons: {armorEntry.tons})
                  </option>
                );
              })}
            </select>
          </div>
          {mech.armor.armorFactor > 0 && (
            <>
              <DistributeArmor
                maxArmor={armorOptionsStandard[armorOptionsStandard.length - 1]}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Armor;
