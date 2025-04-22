import { useDispatch, useSelector } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const AdvancedMechData = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const handleTechBaseRadio = (event) => {
    dispatch(mechActions.setTechnologyBase(event.target.value));
  };

  const handleChassisTypeRadio = (event) => {
    dispatch(mechActions.setChassisType(event.target.value));
  };

  return (
    <>
      <div id="tech-base-radio">
        <p>Choose Technology Base:</p>
        <input
          type="radio"
          id="tech-base-is"
          name="tech-base"
          value="Inner Sphere"
          checked={mech.technologyBase === "Inner Sphere"}
          onChange={handleTechBaseRadio}
        />
        <label htmlFor="tech-base-is">Inner Sphere</label>
        <input
          type="radio"
          id="tech-base-clan"
          name="tech-base"
          value="Clan"
          checked={mech.technologyBase === "Clan"}
          onChange={handleTechBaseRadio}
        />
        <label htmlFor="tech-base-clan">Clan</label>
      </div>
      <div id="chassis-type-radio">
        <p>Choose Chassis Type:</p>
        <input
          type="radio"
          id="chassis-type-bipedal"
          name="chassis-type"
          value="Bipedal"
          checked={mech.chassisType === "Bipedal"}
          onChange={handleChassisTypeRadio}
        />
        <label htmlFor="chassis-type-bipedal">Bipedal</label>
        <input
          type="radio"
          id="chassis-type-quad"
          name="chassis-type"
          value="Quad"
          checked={mech.chassisType === "Quad"}
          onChange={handleChassisTypeRadio}
        />
        <label htmlFor="chassis-type-quad">Quad</label>
      </div>
    </>
  );
};

export default AdvancedMechData;
