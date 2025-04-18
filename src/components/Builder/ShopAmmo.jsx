import { useDispatch, useSelector } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const ShopAmmo = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const handleAddAmmo = (weapon) => {
    dispatch(mechActions.addAmmo(weapon));
  };
  const handleRemoveAmmo = (weapon) => {
    dispatch(mechActions.removeAmmo(weapon));
  };
  const toggleHalfTons = (weapon) => {};

  const weaponsWithAmmo = [];
  let mechHasAmmoWeapons = false;

  mech.equipment.weapons.map((weapon) => {
    if (weapon.ammo !== "-") {
      mechHasAmmoWeapons = true;
      const weaponWithAmmo = { ...weapon, number: 0 };
      weaponsWithAmmo.push(weaponWithAmmo);
    }
  });

  const groupedWeapons = weaponsWithAmmo.reduce((acc, weapon) => {
    if (acc[weapon.name]) {
      acc[weapon.name].number += 1;
    } else acc[weapon.name] = { ...weapon, number: 1 };
    return acc;
  }, {});
  const groupedWeaponsArray = Object.values(groupedWeapons);
  console.log(groupedWeaponsArray);

  return (
    <div>
      {mechHasAmmoWeapons && (
        <>
          <h4>Ammo</h4>
          <table>
            <thead>
              <tr>
                <th>Weapon</th>
                <th>Ammo/Ton</th>
                <th>Rounds</th>
                <th>Current Ammo</th>
              </tr>
            </thead>
            <tbody>
              {groupedWeaponsArray.map((weapon) => {
                let ammoTons = 0;
                mech.equipment.ammo.map((ammo) => {
                  if (ammo.ammoFor === weapon.name) ammoTons++;
                });

                console.log("hi");

                console.log(weapon.name);
                return (
                  <tr key={`ammo${weapon.id}`}>
                    <td>
                      {weapon.number} {weapon.name}
                    </td>
                    <td>{weapon.ammo}</td>
                    <td> {Number(weapon.ammo) * Number(ammoTons)}</td>
                    <td>
                      {ammoTons > 1 && (
                        <button onClick={() => handleRemoveAmmo(weapon)}>
                          -
                        </button>
                      )}
                      {ammoTons}

                      <button onClick={() => handleAddAmmo(weapon)}>+</button>
                      {weapon.name === "MG" && (
                        <button onClick={() => toggleHalfTons(weapon)}>
                          0.5
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default ShopAmmo;
