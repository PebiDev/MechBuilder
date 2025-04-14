import equipment_lvl1 from "../../data/equipment_lvl1";

import ShopItem from "./ShopItem";

const EQUIPMENT = equipment_lvl1;

const ShopEquipment = () => {
  return (
    <div id="shop-equipment">
      <h3>Choose Weapons</h3>
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
            return <ShopItem item={item} key={item.name} />;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ShopEquipment;
