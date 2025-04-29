import styles from "./ShopEquipment.module.css";
import { mechActions } from "../../store/mech-slice";
import { useSelector, useDispatch } from "react-redux";

const ShopItem = ({ item }) => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const handleAddItem = () => {
    const itemToAdd = { ...item };
    if (itemToAdd.category === "Special Equipment") {
      dispatch(mechActions.addGear(itemToAdd));
    } else {
      dispatch(mechActions.addWeapon(itemToAdd));
    }
  };

  return (
    <tr key={item.name} className={styles.tableRow}>
      <td className={styles.tableEntry}>{item.name}</td>
      <td className={styles.tableEntry}>{item.tons}</td>
      <td className={styles.tableEntry}>{item.critical}</td>
      <td className={styles.tableEntry}>
        <button onClick={handleAddItem}>Add</button>
      </td>
    </tr>
  );
};

export default ShopItem;
