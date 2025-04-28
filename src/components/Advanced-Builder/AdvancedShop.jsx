import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

import ShopItem from "../Builder/ShopItem";
import AdvancedShopCategory from "./AdvancedShopCategory";

const AdvancedShop = ({ equipmentList }) => {
  const mech = useSelector((state) => state.mech);
  const [equipList, setEquipList] = useState(equipmentList);
  let categoriesList = [...new Set(equipmentList.map((item) => item.category))];

  let hatchet = equipList.find((item) => item.name === "Hatchet");
  if (hatchet) {
    hatchet.tons = Math.round(mech.tonnage / 15);
    hatchet.critical = Math.round(mech.tonnage / 15);
  }

  let lance = equipList.find((item) => item.name === "Lance");
  if (lance) {
    lance.tons = Math.round(mech.tonnage / 20);
    lance.critical = Math.round(mech.tonnage / 20);
  }

  let sword = equipList.find((item) => item.name === "Sword");
  if (sword) {
    sword.tons = Math.round(mech.tonnage / 20);
    sword.critical = Math.round(mech.tonnage / 15);
  }

  const handleFilter = (category) => {
    setEquipList(equipmentList.filter((item) => item.category === category));
  };

  return (
    <>
      <div id="shop-categories">
        {categoriesList.map((category) => (
          <AdvancedShopCategory
            key={category}
            category={category}
            handleCategory={handleFilter}
          />
        ))}
      </div>
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
          {equipList.map((item) => {
            //current solution: only dis
            // play items that can still fit in the mech
            if (item.critical <= mech.criticalSlots) {
              return <ShopItem item={item} key={item.name} />;
            }
          })}
        </tbody>
      </table>
    </>
  );
};

export default AdvancedShop;
