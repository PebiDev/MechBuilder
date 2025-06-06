import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

import Gyro from "./Gyro";
import MechData from "./MechData";
import RemainingTons from "./RemainingTons";
import InternalStructureAndCockpit from "./InternalStructureAndCockpit";
import MechReactor from "./MechReactor";
import JumpJets from "./JumpJets";
import HeatSinks from "./HeatSinks";
import Armor from "./Armor";
import InstallEquipment from "./InstallEquipment";
import FinalActions from "./FinalActions";

import "./CreateMechForm.modules.css";
import ShopEquipment from "./ShopEquipment";

const CreateMechForm = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="createForm">
      <form className="mechForm" action="" onSubmit={handleSubmit}>
        <MechData />
        {mech.remainingTons !== null && (
          <div>
            <InternalStructureAndCockpit />
            <MechReactor />
            {mech.movement.walking > 0 && <Gyro />}
            {mech.movement.walking > 0 && <JumpJets />}
            <HeatSinks />
            <Armor />
            <InstallEquipment />
            <ShopEquipment />
            <FinalActions />
            <RemainingTons />
            {/* {mech.remainingTons && <></>} */}
          </div>
        )}
      </form>
    </div>
  );
};

export default CreateMechForm;
