import { useSelector } from "react-redux";

const ShowEquipment = () => {
  const mech = useSelector((state) => state.mech);
  const equipment = [];

  mech.equipment.weapons.map((weapon) => equipment.push(weapon));
  mech.equipment.ammo.map((ammo) => equipment.push(ammo));
  mech.equipment.gear.map((gear) => equipment.push(gear));

  return (
    <>
      {equipment.length > 0 && (
        <div>
          <h3>Equipment :</h3>
          {equipment.map((item) => {
            return (
              <p key={item.id}>
                {item.name}
                <span className="substract-tons">-{item.tons} tons</span>
              </p>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ShowEquipment;
