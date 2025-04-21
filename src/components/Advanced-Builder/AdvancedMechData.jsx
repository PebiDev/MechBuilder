import { useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const AdvancedMechData = () => {
  const dispatch = useDispatch();

  const handleTechBaseRadio = (event) => {
    dispatch(mechActions.setTechnologyBase(event.target.value));
  };

  const handleChassisTypeRadio = (event) => {
    console.log(event.target.value);
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
          onClick={handleTechBaseRadio}
          defaultChecked
        />
        <label htmlFor="tech-base-is">Inner Sphere</label>
        <input
          type="radio"
          id="tech-base-clan"
          name="tech-base"
          value="Clan"
          onClick={handleTechBaseRadio}
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
          onClick={handleChassisTypeRadio}
          defaultChecked
        />
        <label htmlFor="chassis-type-bipedal">Bipedal</label>
        <input
          type="radio"
          id="chassis-type-quad"
          name="chassis-type"
          value="Quad"
          onClick={handleChassisTypeRadio}
        />
        <label htmlFor="chassis-type-quad">Quad</label>
      </div>
    </>
  );
};

export default AdvancedMechData;
