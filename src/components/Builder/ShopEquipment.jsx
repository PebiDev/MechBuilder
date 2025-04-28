import equipment_lvl1 from "../../data/equipment_lvl1";
import equipment_IS from "../../data/equipment_IS/equipment_IS";
import equipment_Clan from "../../data/equipment_Clan/equipment_Clan";

import { useSelector } from "react-redux";
import AdvancedShop from "../Advanced-Builder/AdvancedShop";

import ShopItem from "./ShopItem";
import ShopAmmo from "./ShopAmmo";

const EQUIPMENT_IS = equipment_IS;
const EQUIPMENT_CLAN = equipment_Clan;
const EQUIPMENT = equipment_lvl1;

const ShopEquipment = () => {
  const mech = useSelector((state) => state.mech);
  const tonnage = mech.tonnage;
  const ui = useSelector((state) => state.ui);
  return (
    <div id="shop-equipment" className="form-element">
      <ShopAmmo />

      <h3>Choose Weapons</h3>
      {ui.advancedOptions ? (
        <>
          {mech.technologyBase === "Clan" ? (
            <AdvancedShop equipmentList={EQUIPMENT_CLAN} />
          ) : (
            <AdvancedShop equipmentList={EQUIPMENT_IS} />
          )}
        </>
      ) : (
        <table id="shop-table">
          <thead>
            <tr>
              <th>Weapon</th>
              <th>Tons</th>
              <th>Critical</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {EQUIPMENT.map((item) => {
              //current solution: only display items that can still fit in the mech
              if (item.critical <= mech.criticalSlots) {
                return <ShopItem item={item} key={item.name} />;
              }
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShopEquipment;
