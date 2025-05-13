import { useSelector, useDispatch } from "react-redux";
import { Button, Tooltip, Box, Typography } from "@mui/material";
import { mechActions } from "../../store/mech-slice";
import { uiActions } from "../../store/ui-slice";
import DistributeArmorSlider from "./DistributeArmorSlider";
import DistributeArmorRearSlider from "./DistributeArmorRearSlider";
import { tooltips } from "../constants/tooltips.tsx";

const DistributeArmor = ({ maxArmor }) => {
  const dispatch = useDispatch();
  const armorSliders = useSelector((state) => state.ui.armorSliders);
  const chassisType = useSelector((state) => state.mech.chassisType);
  const unassignedPoints = useSelector(
    (state) => state.mech.armor.unassignedPoints
  );
  const armorWeight = useSelector((state) => state.mech.armor.armorWeight);
  const isQuad = chassisType === "Quad";

  const toggleArmorSliders = () => {
    dispatch(uiActions.toggleArmorSliders());
  };

  const handleDistribute = () => {
    dispatch(mechActions.autoArmorDistribution());
  };

  const handleMaxArmor = () => {
    dispatch(
      mechActions.maxArmor({ tons: maxArmor.tons, value: maxArmor.value })
    );
  };

  const handleStripArmor = () => {
    dispatch(mechActions.stripArmor());
  };

  const hideArmorDistributionHandler = () => {
    dispatch(uiActions.toggleArmorVisible());
  };

  return (
    <Box id="distribute-armor" display="flex" flexDirection="column" gap={2}>
      {/* Buttons row */}
      <Box display="flex" flexWrap="wrap" gap={1} alignItems="center">
        <Button variant="outlined" size="small" onClick={toggleArmorSliders}>
          Enter Armor Value {armorSliders ? "manually" : "via Sliders"}
        </Button>

        <Tooltip title={tooltips.armorButtons.distributeArmor} arrow>
          <span>
            <Button variant="contained" size="small" onClick={handleDistribute}>
              Distribute Armor
            </Button>
          </span>
        </Tooltip>

        <Tooltip title={tooltips.armorButtons.maxArmor} arrow>
          <span>
            <Button variant="contained" size="small" onClick={handleMaxArmor}>
              Max Armor
            </Button>
          </span>
        </Tooltip>

        <Tooltip title={tooltips.armorButtons.stripArmor} arrow>
          <span>
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleStripArmor}
            >
              Strip Armor
            </Button>
          </span>
        </Tooltip>

        {unassignedPoints === 0 && armorWeight > 0 && (
          <Button
            variant="text"
            color="secondary"
            size="small"
            onClick={hideArmorDistributionHandler}
          >
            Hide Armor Distribution
          </Button>
        )}
      </Box>

      {/* Armor points summary */}
      <Typography variant="body1">
        Unassigned Armorpoints:{" "}
        <Box
          component="span"
          sx={{ color: unassignedPoints > 0 ? "#ffc404" : "#40d250" }}
        >
          {unassignedPoints}
        </Box>
      </Typography>

      {/* Sliders */}
      <DistributeArmorSlider zone="head" />
      <DistributeArmorRearSlider zone="ctorso" rearzone="ctrear" />
      <DistributeArmorRearSlider zone="rltorso" rearzone="rltrear" />

      {isQuad ? (
        <>
          <DistributeArmorSlider zone="frlleg" />
          <DistributeArmorSlider zone="rrlleg" />
        </>
      ) : (
        <>
          <DistributeArmorSlider zone="rlarm" />
          <DistributeArmorSlider zone="rlleg" />
        </>
      )}
    </Box>
  );
};

export default DistributeArmor;
