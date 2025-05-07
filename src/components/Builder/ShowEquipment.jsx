import { useSelector } from "react-redux";
import { useMemo } from "react";

const ShowEquipment = () => {
  const weapons = useSelector((state) => state.mech.equipment.weapons);
  const ammo = useSelector((state) => state.mech.equipment.ammo);
  const gear = useSelector((state) => state.mech.equipment.gear);

  const equipment = useMemo(
    () => [...weapons, ...ammo, ...gear],
    [weapons, ammo, gear]
  );

  if (equipment.length === 0) return null;

  return (
    <div>
      <h3>Equipment :</h3>
      {equipment.map((item) => (
        <p key={item.id}>
          {item.name}
          <span className="substract-tons"> -{item.tons} tons</span>
        </p>
      ))}
    </div>
  );
};

export default ShowEquipment;
