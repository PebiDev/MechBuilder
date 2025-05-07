import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { uiActions } from "../../store/ui-slice";
import { useMemo } from "react";
import DistributeArmor from "./DistributeArmor";

const Armor = () => {
  const dispatch = useDispatch();

  const armor = useSelector((state) => state.mech.armor);
  const zones = useSelector((state) => state.mech.zones);
  const techBase = useSelector((state) => state.mech.technologyBase);
  const armorVisible = useSelector((state) => state.ui.armorVisible);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const maxArmor = armor.internal.maxarmor;

  const armorOptionsStandard = useMemo(() => {
    const options = [];
    const maxPoints = Math.round(
      maxArmor / 8 / armor.armorBasePointsMultiplier
    );
    for (let i = 0; i < maxPoints; i++) {
      const points = Math.round(i * 8 * armor.armorBasePointsMultiplier);
      if (points < maxArmor) {
        options.push({ tons: i * 0.5, value: points });
      }
    }
    options.push({ tons: maxPoints * 0.5, value: maxArmor });
    return options;
  }, [maxArmor, armor.armorBasePointsMultiplier]);

  const handleArmorSlider = (e) => {
    dispatch(mechActions.addArmor(Number(e.target.value)));
  };

  const handleArmorSelect = (e) => {
    dispatch(mechActions.addArmor(Number(e.target.value)));
  };

  const toggleArmorVisible = () => {
    dispatch(uiActions.toggleArmorVisible());
  };

  const removeEquipForStealthArmor = () => {
    for (const [zoneName, zone] of Object.entries(zones)) {
      if (zoneName === "head") continue;

      const totalSlots = Object.keys(zone).length;
      const slots = ["loc" + totalSlots, "loc" + (totalSlots - 1)];
      dispatch(
        mechActions.unInstallEquipFromZone({ zones: [zoneName], slots })
      );
    }
  };

  const handleArmorTypeSelect = (e) => {
    const type = e.target.value;
    if (type === "Stealth Armor") {
      removeEquipForStealthArmor();
    }
    dispatch(mechActions.setArmorType(type));
  };

  return (
    <div id="armor" className="form-element">
      <p>
        Armor Value: {armor.armorFactor}
        <br />
        Armor Weight: {armor.armorWeight} tons
        {armor.armorWeight > 0 && (
          <span className="substract-tons">-{armor.armorWeight} tons</span>
        )}
        {!armorVisible && (
          <button type="button" onClick={toggleArmorVisible}>
            Show Armor
          </button>
        )}
      </p>

      {advancedOptions && (
        <div id="armor-type">
          <label htmlFor="armortype-select">Choose Armor Type</label>
          <select
            id="armortype-select"
            name="armortype-select"
            value={armor.armorType}
            onChange={handleArmorTypeSelect}
          >
            <option value="Standard">Standard Armor</option>
            <option value="Ferro-Fibrous">Ferro-Fibrous</option>
            {techBase === "Inner Sphere" && (
              <>
                <option value="Light Ferro-Fibrous">Light Ferro-Fibrous</option>
                <option value="Heavy Ferro-Fibrous">Heavy Ferro-Fibrous</option>
                <option value="Stealth Armor">Stealth Armor</option>
              </>
            )}
          </select>
        </div>
      )}

      {armorVisible && (
        <div id="armor-distribution">
          <div id="armor-points">
            Choose Armor by Points:
            <input
              type="range"
              min="0"
              max={maxArmor}
              className="slider"
              id="myRange"
              value={armor.armorFactor}
              onChange={handleArmorSlider}
            />
            {maxArmor}
          </div>

          <div id="armor-tons">
            Choose Armor by Tons:
            <label htmlFor="armor-tons-select"></label>
            <select
              id="armor-tons-select"
              name="armor-tons-select"
              onChange={handleArmorSelect}
              value={armor.armorFactor}
            >
              {armorOptionsStandard.map((opt) => (
                <option key={opt.tons} value={opt.value}>
                  {opt.value} (tons: {opt.tons})
                </option>
              ))}
            </select>
          </div>

          {armor.armorFactor > 0 && (
            <DistributeArmor
              maxArmor={armorOptionsStandard[armorOptionsStandard.length - 1]}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Armor;
