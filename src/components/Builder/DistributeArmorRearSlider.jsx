import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Slider, Typography } from "@mui/material";
import { mechActions } from "../../store/mech-slice";

const DistributeArmorRearSlider = ({ zone, rearzone }) => {
  const dispatch = useDispatch();
  const armor = useSelector((state) => state.mech.armor);

  const maxArmor = useMemo(
    () => armor.internal[zone] * 2,
    [armor.internal, zone]
  );

  const checkOverArmored = (points) => Math.min(points, armor.unassignedPoints);

  const frontSlideHandler = (_, newValue) => {
    const frontValue = checkOverArmored(newValue);
    const rearValue = Math.min(
      maxArmor - frontValue,
      armor.armorValue[rearzone]
    );

    dispatch(
      mechActions.addArmorValueToZone({ zone, armorpoints: frontValue })
    );
    dispatch(
      mechActions.addArmorValueToZone({
        zone: rearzone,
        armorpoints: rearValue,
      })
    );
  };

  const rearSlideHandler = (_, newValue) => {
    const rearValue = checkOverArmored(newValue);
    const frontValue = Math.min(maxArmor - rearValue, armor.armorValue[zone]);

    dispatch(
      mechActions.addArmorValueToZone({
        zone: rearzone,
        armorpoints: rearValue,
      })
    );
    dispatch(
      mechActions.addArmorValueToZone({ zone, armorpoints: frontValue })
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" gutterBottom>
          Front Armor – {zone.toUpperCase()}: {armor.armorValue[zone]} /{" "}
          {maxArmor}
        </Typography>
        <Slider
          value={armor.armorValue[zone]}
          min={0}
          max={maxArmor}
          onChange={frontSlideHandler}
          sx={{ width: 300 }}
          aria-label={`Front armor slider for ${zone}`}
        />
      </Box>

      <Box>
        <Typography variant="body2" gutterBottom>
          Rear Armor – {rearzone.toUpperCase()}: {armor.armorValue[rearzone]} /{" "}
          {maxArmor}
        </Typography>
        <Slider
          value={armor.armorValue[rearzone]}
          min={0}
          max={maxArmor}
          onChange={rearSlideHandler}
          sx={{ width: 300 }}
          aria-label={`Rear armor slider for ${rearzone}`}
        />
      </Box>
    </Box>
  );
};

export default React.memo(DistributeArmorRearSlider);

// import React, { useMemo } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { mechActions } from "../../store/mech-slice";

// const DistributeArmorRearSlider = ({ zone, rearzone }) => {
//   const dispatch = useDispatch();
//   const armor = useSelector((state) => state.mech.armor);

//   const maxArmor = useMemo(
//     () => armor.internal[zone] * 2,
//     [armor.internal, zone]
//   );

//   const checkOverArmored = (points) => Math.min(points, armor.unassignedPoints);

//   const frontSlideHandler = (event) => {
//     const frontValue = checkOverArmored(Number(event.target.value));
//     const rearValue = Math.min(
//       maxArmor - frontValue,
//       armor.armorValue[rearzone]
//     );

//     dispatch(
//       mechActions.addArmorValueToZone({ zone, armorpoints: frontValue })
//     );
//     dispatch(
//       mechActions.addArmorValueToZone({
//         zone: rearzone,
//         armorpoints: rearValue,
//       })
//     );
//   };

//   const rearSlideHandler = (event) => {
//     const rearValue = checkOverArmored(Number(event.target.value));
//     const frontValue = Math.min(maxArmor - rearValue, armor.armorValue[zone]);

//     dispatch(
//       mechActions.addArmorValueToZone({
//         zone: rearzone,
//         armorpoints: rearValue,
//       })
//     );
//     dispatch(
//       mechActions.addArmorValueToZone({ zone, armorpoints: frontValue })
//     );
//   };

//   return (
//     <div className="dist-armor-slider">
//       <span>
//         Choose Armor for {zone}: {armor.armorValue[zone]} ({maxArmor})
//       </span>
//       <input
//         type="range"
//         min="0"
//         max={maxArmor}
//         className="slider"
//         value={armor.armorValue[zone]}
//         onInput={frontSlideHandler}
//       />

//       <br />
//       <span>
//         Choose Armor for {rearzone}: {armor.armorValue[rearzone]} ({maxArmor})
//       </span>
//       <input
//         type="range"
//         min="0"
//         max={maxArmor}
//         className="slider"
//         value={armor.armorValue[rearzone]}
//         onInput={rearSlideHandler}
//       />
//     </div>
//   );
// };

// export default React.memo(DistributeArmorRearSlider);
