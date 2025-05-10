import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { uiActions } from "../../store/ui-slice";
import DistributeArmorSlider from "./DistributeArmorSlider";
import DistributeArmorRearSlider from "./DistributeArmorRearSlider";

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
    <div id="distribute-armor">
      <button onClick={toggleArmorSliders}>
        Enter ArmorValue {armorSliders ? "manually" : "via Sliders"}
      </button>
      <button type="button" onClick={handleDistribute}>
        Distribute Armor
      </button>
      <button type="button" onClick={handleMaxArmor}>
        Max Armor
      </button>
      <button type="button" onClick={handleStripArmor}>
        Strip Armor
      </button>

      {unassignedPoints === 0 && armorWeight > 0 && (
        <button type="button" onClick={hideArmorDistributionHandler}>
          Hide Armor Distribution
        </button>
      )}

      <p>
        Unassigned Armorpoints:{" "}
        <span style={{ color: unassignedPoints > 0 ? "#ffc404" : "#40d250" }}>
          {unassignedPoints}
        </span>
      </p>

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
    </div>
  );
};

export default DistributeArmor;
