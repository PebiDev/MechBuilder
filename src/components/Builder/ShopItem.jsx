import styles from "./ShopEquipment.module.css";
import { mechActions } from "../../store/mech-slice";
import { useDispatch } from "react-redux";
import React from "react";
import { Tooltip, Typography, Box } from "@mui/material";
import { Highlight } from "../constants/tooltips";

const ShopItem = ({ item }) => {
  const dispatch = useDispatch();

  const itemTooltip = (
    <Box sx={{ p: 1 }}>
      <Box
        sx={{
          backgroundColor: "grey.300",
          borderRadius: 1,
          px: 1,
          py: 0.5,
          mb: 1,
        }}
      >
        <Typography variant="subtitle2" fontWeight="bold">
          {item.name}
        </Typography>
        <Typography variant="body2">
          Tons: <Highlight>{item.tons}</Highlight> | Crits:{" "}
          <Highlight>{item.critical}</Highlight>
        </Typography>
      </Box>

      <Typography variant="body2">
        Category: <Highlight>{item.category}</Highlight>
      </Typography>

      {item.ammo !== "-" && (
        <Typography variant="body2">
          Ammo per Ton: <Highlight>{item.ammo}</Highlight>
        </Typography>
      )}
    </Box>
  );
  const handleAddItem = () => {
    const itemToAdd = { ...item };
    if (itemToAdd.category === "Special Equipment") {
      dispatch(mechActions.addGear(itemToAdd));
    } else {
      dispatch(mechActions.addWeapon(itemToAdd));
    }
  };

  return (
    <Tooltip title={itemTooltip} placement="top">
      <tr className={styles.tableRow}>
        <td className={styles.tableEntry}>{item.name}</td>
        <td className={styles.tableEntry}>{item.tons}</td>
        <td className={styles.tableEntry}>{item.critical}</td>
        <td className={styles.tableEntry}>
          <button onClick={handleAddItem}>Add</button>
        </td>
      </tr>
    </Tooltip>
  );
};

export default React.memo(ShopItem);
