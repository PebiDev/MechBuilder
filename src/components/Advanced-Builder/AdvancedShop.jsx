import { useSelector } from "react-redux";
import { useState, useMemo } from "react";

import ShopItem from "../Builder/ShopItem";
import AdvancedShopCategory from "./AdvancedShopCategory";

const AdvancedShop = ({ equipmentList }) => {
  const tonnage = useSelector((state) => state.mech.tonnage);
  const criticalSlots = useSelector((state) => state.mech.criticalSlots);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const adjustedEquipment = useMemo(() => {
    return equipmentList.map((item) => {
      if (item.name === "Hatchet") {
        return {
          ...item,
          tons: Math.round(tonnage / 15),
          critical: Math.round(tonnage / 15),
        };
      }
      if (item.name === "Lance") {
        return {
          ...item,
          tons: Math.round(tonnage / 20),
          critical: Math.round(tonnage / 20),
        };
      }
      if (item.name === "Sword") {
        return {
          ...item,
          tons: Math.round(tonnage / 20),
          critical: Math.round(tonnage / 15),
        };
      }
      return item;
    });
  }, [equipmentList, tonnage]);

  const categoriesList = useMemo(() => {
    return [...new Set(equipmentList.map((item) => item.category))];
  }, [equipmentList]);

  const filteredList = useMemo(() => {
    return selectedCategory
      ? adjustedEquipment.filter((item) => item.category === selectedCategory)
      : adjustedEquipment;
  }, [adjustedEquipment, selectedCategory]);

  return (
    <>
      <div id="shop-categories">
        {categoriesList.map((category) => (
          <AdvancedShopCategory
            key={category}
            category={category}
            handleCategory={() => setSelectedCategory(category)}
          />
        ))}
        {selectedCategory && (
          <button onClick={() => setSelectedCategory(null)}>Show All</button>
        )}
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
          {filteredList.map((item) =>
            item.critical <= criticalSlots ? (
              <ShopItem item={item} key={item.name} />
            ) : null
          )}
        </tbody>
      </table>
    </>
  );
};

export default AdvancedShop;
