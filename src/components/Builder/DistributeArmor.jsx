import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import DistributeArmorSlider from "./DistributeArmorSlider";
import DistributeArmorRearSlider from "./DistributeArmorRearSlider";
import { uiActions } from "../../store/ui-slice";

const DistributeArmor = ({ maxArmor }) => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const handleDistribute = () => {
    //dispatch(mechActions.distibuteArmor());
    dispatch(mechActions.testArmorDistribution(mech));
  };

  const handleMaxArmor = () => {
    dispatch(
      mechActions.maxArmor({ tons: maxArmor.tons, value: maxArmor.value })
    );
  };

  const handleStripArmor = () => {
    dispatch(mechActions.stripArmor(mech));
  };

  const hideArmorDistributionHandler = (event) => {
    dispatch(uiActions.toggleArmorVisible());
  };

  return (
    <div id="distribute-armor">
      <button type="button" onClick={handleDistribute}>
        Distribute Armor
      </button>
      <button type="button" onClick={handleMaxArmor}>
        Max Armor
      </button>
      <button type="button" onClick={handleStripArmor}>
        Strip Armor
      </button>
      {mech.armor.unassignedpoints == 0 && mech.armor.armorWeight > 0 && (
        <button type="button" onClick={hideArmorDistributionHandler}>
          Hide Armor Distribution
        </button>
      )}
      <p>
        Unassigned Armorpoints:{" "}
        <span
          // style={{ color: "#ffc404" }}
          style={{
            color: mech.armor.unassignedpoints > 0 ? "ffc404" : "#40d250",
          }}
        >
          {mech.armor.unassignedpoints}
        </span>{" "}
      </p>
      <DistributeArmorSlider zone="head" />
      <DistributeArmorRearSlider zone="ctorso" rearzone="ctrear" />
      <DistributeArmorRearSlider zone="rltorso" rearzone="rltrear" />
      <DistributeArmorSlider zone="rlarm" />
      <DistributeArmorSlider zone="rlleg" />
    </div>
  );
};

export default DistributeArmor;
