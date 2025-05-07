import { useDispatch, useSelector } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const ShopAmmo = () => {
  const dispatch = useDispatch();

  const equipment = useSelector((state) => state.mech.equipment);
  const criticalSlots = useSelector((state) => state.mech.criticalSlots);
  const remainingTons = useSelector((state) => state.mech.remainingTons);

  const handleAddAmmo = (weapon) => {
    dispatch(mechActions.addAmmo(weapon));
  };

  const handleRemoveAmmo = (weapon) => {
    dispatch(mechActions.removeAmmo(weapon));
  };

  const weaponsWithAmmo = [];
  let mechHasAmmoWeapons = false;

  equipment.weapons.forEach((weapon) => {
    if (!isNaN(Number(weapon.ammo))) {
      mechHasAmmoWeapons = true;
      const weaponWithAmmo = { ...weapon, number: 0 };
      weaponsWithAmmo.push(weaponWithAmmo);
    }
  });

  const groupedWeapons = weaponsWithAmmo.reduce((acc, weapon) => {
    if (acc[weapon.name]) {
      acc[weapon.name].number += 1;
    } else {
      acc[weapon.name] = { ...weapon, number: 1 };
    }
    return acc;
  }, {});

  const groupedWeaponsArray = Object.values(groupedWeapons);

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
                equipment.ammo.forEach((ammo) => {
                  if (ammo.ammoFor === weapon.name) {
                    ammoTons += ammo.tons;
                  }
                });

                return (
                  <tr key={`ammo${weapon.id}`}>
                    <td>
                      {weapon.number} {weapon.name}
                    </td>
                    <td>{weapon.ammo}</td>
                    <td>{Number(weapon.ammo) * Number(ammoTons)}</td>
                    <td>
                      {ammoTons > 0.5 && (
                        <button onClick={() => handleRemoveAmmo(weapon)}>
                          -
                        </button>
                      )}
                      {ammoTons}
                      {criticalSlots > 0 && remainingTons > 0 && (
                        <button onClick={() => handleAddAmmo(weapon)}>+</button>
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
