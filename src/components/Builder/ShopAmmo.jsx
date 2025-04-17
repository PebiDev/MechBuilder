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
  const weaponsWithAmmo = [];

  let mechHasAmmoWeapons = false;
  mech.equipment.weapons.map((weapon) => {
    if (weapon.ammo !== "-") {
      mechHasAmmoWeapons = true;
      weaponsWithAmmo.push(weapon);
    }
  });

  return (
    <div>
      {mechHasAmmoWeapons && (
        <>
          <h4>Ammo</h4>
          <table>
            <thead>
              <tr>
                <th>Weapon</th>
                <th>Ammo per Ton</th>
                <th>Current Ammo</th>
              </tr>
            </thead>
            <tbody>
              {weaponsWithAmmo.map((weapon) => {
                let ammoTons = 0;
                mech.equipment.ammo.map((ammo) => {
                  if (ammo.ammoFor === weapon.name) ammoTons++;
                });
                return (
                  <tr key={`ammo${weapon.id}`}>
                    <td>{weapon.name}</td>
                    <td>{weapon.ammo}</td>
                    <td>
                      {ammoTons > 1 && (
                        <button onClick={() => handleRemoveAmmo(weapon)}>
                          -
                        </button>
                      )}
                      {ammoTons}

                      <button onClick={() => handleAddAmmo(weapon)}>+</button>
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
