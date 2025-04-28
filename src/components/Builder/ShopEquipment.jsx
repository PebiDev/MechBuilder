import equipment_lvl1 from "../../data/equipment_lvl1";
import { useSelector } from "react-redux";
import AdvancedShop from "../Advanced-Builder/AdvancedShop";

import ShopItem from "./ShopItem";
import ShopAmmo from "./ShopAmmo";

const EQUIPMENT = equipment_lvl1;

const ShopEquipment = () => {
  const mech = useSelector((state) => state.mech);
  const ui = useSelector((state) => state.ui);
  return (
    <div id="shop-equipment" className="form-element">
      <ShopAmmo />

      <h3>Choose Weapons</h3>
      {ui.advancedOptions ? (
        <AdvancedShop />
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
