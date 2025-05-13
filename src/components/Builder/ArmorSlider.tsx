import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Slider, Typography } from "@mui/material";
//@ts-ignore
import { mechActions } from "../../store/mech-slice";
//@ts-ignore
import { RootState } from "../../store";

type ArmorSliderProps = {
  zone: string;
  rearzone?: string;
};

const ArmorSlider: React.FC<ArmorSliderProps> = ({ zone, rearzone }) => {
  const dispatch = useDispatch();
  const armor = useSelector((state: RootState) => state.mech.armor);

  const zoneArmor = armor.armorValue[zone];
  const rearArmor = rearzone ? armor.armorValue[rearzone] : 0;
  const internal = armor.internal[zone];
  const unassignedPoints = armor.unassignedPoints;

  const maxArmor = useMemo(
    () => (zone === "head" ? 9 : internal * 2),
    [zone, internal]
  );

  const totalAssigned = zoneArmor + (rearzone ? rearArmor : 0);
  const totalAvailable = totalAssigned + unassignedPoints;

  const handleSingleSliderChange = (_: Event, value: number | number[]) => {
    const newValue = typeof value === "number" ? value : value[0];
    const maxAssignable = zoneArmor + unassignedPoints;
    const clamped = Math.min(newValue, maxArmor, maxAssignable);
    dispatch(
      mechActions.addArmorValueToZone({
        zone,
        armorpoints: clamped,
      })
    );
  };

  const handleFrontSliderChange = (_: Event, value: number | number[]) => {
    let newFront = Math.floor(typeof value === "number" ? value : value[0]);
    let newRear = rearArmor;

    // Clamp total to maxArmor
    if (newFront + newRear > maxArmor) {
      newRear = Math.max(0, maxArmor - newFront);
    }

    const deltaFront = newFront - zoneArmor;
    const deltaRear = newRear - rearArmor;
    const totalDelta = deltaFront + deltaRear;

    if (totalDelta > unassignedPoints) {
      const overflow = totalDelta - unassignedPoints;

      // Prefer reducing rear first
      const rearReduction = Math.min(overflow, newRear - rearArmor);
      newRear -= rearReduction;

      const remainingOverflow = overflow - rearReduction;
      newFront -= remainingOverflow;
    }

    dispatch(
      mechActions.addArmorValueToZone({
        zone,
        armorpoints: Math.max(0, newFront),
      })
    );
    if (rearzone) {
      dispatch(
        mechActions.addArmorValueToZone({
          zone: rearzone,
          armorpoints: Math.max(0, newRear),
        })
      );
    }
  };

  const handleRearSliderChange = (_: Event, value: number | number[]) => {
    let newRear = Math.floor(typeof value === "number" ? value : value[0]);
    let newFront = zoneArmor;

    if (newRear + newFront > maxArmor) {
      newFront = Math.max(0, maxArmor - newRear);
    }

    const deltaFront = newFront - zoneArmor;
    const deltaRear = newRear - rearArmor;
    const totalDelta = deltaFront + deltaRear;

    if (totalDelta > unassignedPoints) {
      const overflow = totalDelta - unassignedPoints;

      // Prefer reducing front first
      const frontReduction = Math.min(overflow, newFront - zoneArmor);
      newFront -= frontReduction;

      const remainingOverflow = overflow - frontReduction;
      newRear -= remainingOverflow;
    }

    if (rearzone) {
      dispatch(
        mechActions.addArmorValueToZone({
          zone: rearzone,
          armorpoints: Math.max(0, newRear),
        })
      );
    }
    dispatch(
      mechActions.addArmorValueToZone({
        zone,
        armorpoints: Math.max(0, newFront),
      })
    );
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ mb: rearzone ? 2 : 0 }}>
        <Typography variant="body2" gutterBottom>
          {rearzone ? "Front Armor" : "Choose Armor"} – {zone.toUpperCase()}:{" "}
          {zoneArmor} / {maxArmor}
        </Typography>
        <Slider
          value={zoneArmor}
          min={0}
          max={maxArmor}
          step={1}
          marks
          onChange={
            rearzone ? handleFrontSliderChange : handleSingleSliderChange
          }
          sx={{ width: 300 }}
          aria-label={`${rearzone ? "Front" : "Armor"} slider for ${zone}`}
        />
      </Box>

      {rearzone && (
        <Box>
          <Typography variant="body2" gutterBottom>
            Rear Armor – {rearzone.toUpperCase()}: {rearArmor} / {maxArmor}
          </Typography>
          <Slider
            value={rearArmor}
            min={0}
            max={maxArmor}
            step={1}
            marks
            onChange={handleRearSliderChange}
            sx={{ width: 300 }}
            aria-label={`Rear armor slider for ${rearzone}`}
          />
        </Box>
      )}
    </Box>
  );
};

export default React.memo(ArmorSlider);
