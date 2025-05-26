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
      {item.category !== "Special Equipment" && (
        <>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="body2">
              Heat: <Highlight>{item.heat}</Highlight>
            </Typography>
            <Typography variant="body2">
              Damage: <Highlight>{item.damage}</Highlight>
            </Typography>
          </Box>

          <Typography variant="body2">
            Range:
            <br />
            {item.minimal !== "-" && (
              <>
                {" "}
                Min.: <Highlight>{item.minimal} </Highlight>
              </>
            )}{" "}
            Short: <Highlight>{item.range[0]} </Highlight>Medium:{" "}
            <Highlight>{item.range[1]} </Highlight>Long:{" "}
            <Highlight>{item.range[2]} </Highlight>
          </Typography>
        </>
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
      <tr>
        <td>{item.name}</td>
        <td>{item.tons}</td>
        <td>{item.critical}</td>
        <td>
          <button onClick={handleAddItem}>Add</button>
        </td>
      </tr>
    </Tooltip>
  );
};

export default React.memo(ShopItem);
