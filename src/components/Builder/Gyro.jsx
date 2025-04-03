import { useSelector } from "react-redux";

const Gyro = () => {
  const mech = useSelector((state) => state.mech);
  return (
    <div id="mech-gyro">
      <p>
        Installing Gyro:
        <span className="substract-tons">-{mech.gyro.weight} tons</span>
      </p>
    </div>
  );
};

export default Gyro;
