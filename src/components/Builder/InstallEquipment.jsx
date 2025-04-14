import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { uiActions } from "../../store/ui-slice";

const InstallEquipment = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const unInstalledEquipment = [];
  const unInstalledWeapons = [];

  mech.equipment.heatsinks.map((heatsink) => {
    if (heatsink.location == "n/a") {
      unInstalledEquipment.push(heatsink);
    }
  });
  mech.equipment.jumpjets.map((jumpjet) => {
    if (jumpjet.location == "n/a") {
      unInstalledEquipment.push(jumpjet);
    }
  });
  mech.equipment.weapons.map((weapon) => {
    if (weapon.location == "n/a") {
      unInstalledEquipment.push(weapon);
      unInstalledWeapons.push(weapon);
    }
  });
  mech.equipment.ammo.map((ammoItem) => {
    if (ammoItem.location == "n/a") {
      unInstalledEquipment.push(ammoItem);
    }
  });
  mech.equipment.gear.map((gearItem) => {
    if (gearItem.location == "n/a") {
      unInstalledEquipment.push(gearItem);
    }
  });

  // let freeCritSlots = 0;

  const getZonesWithFreeSlots = (criticalSlots) => {
    const zonesWithFreeSlots = [];
    for (const [zones, hitLocation] of Object.entries(mech.zones)) {
      //let hitZone = { zone: zones, freeLocs: [] };
      for (const [key, value] of Object.entries(hitLocation)) {
        if (key == "freeSlots" && value >= criticalSlots) {
          //freeCritSlots += value;
          zonesWithFreeSlots.push(zones);
        }
      }
    }
    return zonesWithFreeSlots;
  };

  const handleZoneSelect = (event) => {
    const equipId = event.target.id;
    const equipToZone = event.target.value;

    dispatch(
      mechActions.InstallEquipment({
        id: equipId,
        zone: equipToZone,
      })
    );
  };

  const handleRemoveWeapon = (weapon) => {
    dispatch(mechActions.removeWeapon(weapon));
  };

  return (
    <div id="install-equipment">
      <div id="critical-slots">
        remaining Critical Slots: {mech.criticalSlots}
      </div>

      {unInstalledEquipment.length > 0 && (
        <div>
          Installing Weapons:
          {unInstalledWeapons.map((unInstalledWeapon) => {
            return (
              <p key={unInstalledWeapon.id}>
                {unInstalledWeapon.name}
                <span className="substract-tons">
                  -{unInstalledWeapon.tons} tons
                </span>
              </p>
            );
          })}
        </div>
      )}

      {unInstalledEquipment.length > 0 && (
        <div id="uninstalled-equipment">
          <table id="equipment-table">
            <thead>
              <tr>
                <th>Weapons and Ammo</th>
                <th>Location</th>
                <th>Critical</th>
                <th>Tonnage</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {unInstalledEquipment.map((equipment) => {
                return (
                  <tr key={equipment.id}>
                    <td>{equipment.name}</td>
                    <td>
                      <select
                        id={equipment.id}
                        name={equipment.id}
                        onChange={handleZoneSelect}
                      >
                        <option default>n/a</option>
                        {getZonesWithFreeSlots(equipment.critical).map(
                          (zone) => {
                            return (
                              <option key={zone} value={zone}>
                                {zone}
                              </option>
                            );
                          }
                        )}
                      </select>
                    </td>
                    <td>{equipment.critical}</td>
                    <td>{equipment.tons}</td>
                    <td>
                      <button
                        onClick={() => {
                          handleRemoveWeapon(equipment);
                        }}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default InstallEquipment;
