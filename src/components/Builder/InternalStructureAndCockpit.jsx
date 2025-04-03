import { useSelector } from "react-redux";

const InternalStructureAndCockpit = () => {
  const mech = useSelector((state) => state.mech);

  return (
    <div id="mech-structure">
      <p>
        Internal Structure: {mech.armor.internal.type}{" "}
        <span className="substract-tons">
          -{mech.armor.internal.standardton} tons
        </span>
      </p>
      <p>
        Cockpit: <span className="substract-tons">-3 tons</span>
      </p>
    </div>
  );
};

export default InternalStructureAndCockpit;
