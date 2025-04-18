import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import { uiActions } from "../../store/ui-slice";
import ShowEquipment from "./ShowEquipment";

const InstallEquipment = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const unInstalledEquipment = [];
  const unInstalledWeapons = [];
  const installedWeapons = [];

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
    } else {
      installedWeapons.push(weapon);
    }
  });
  mech.equipment.ammo.map((ammoItem) => {
    if (ammoItem.location == "n/a") {
      unInstalledEquipment.push(ammoItem);
    } else {
      installedWeapons.push(ammoItem);
    }
  });
  mech.equipment.gear.map((gearItem) => {
    if (gearItem.location == "n/a") {
      unInstalledEquipment.push(gearItem);
    }
  });

  const getZonesWithFreeSlots = (criticalSlots) => {
    const zonesWithFreeSlots = [];
    for (const [zones, hitLocation] of Object.entries(mech.zones)) {
      for (const [key, value] of Object.entries(hitLocation)) {
        if (key == "freeSlots" && value >= criticalSlots) {
          zonesWithFreeSlots.push(zones);
        }
      }
    }
    return zonesWithFreeSlots;
  };

  const isJumpJetLegal = (zone) => {
    const jumpJetIllegalZones = ["rarm", "larm", "head"];
    return jumpJetIllegalZones.includes(zone);
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

  const handleRemoveEquipment = (equip) => {
    dispatch(mechActions.removeEquipment(equip));
  };

  const handleUnInstallSelect = (event) => {
    // event.preventDefault();
    const weaponId = event.target.value;
    dispatch(mechActions.unInstallEquipment(weaponId));
  };

  return (
    <div id="install-equipment">
      <div id="critical-slots">
        remaining Critical Slots: {mech.criticalSlots}
      </div>
      <ShowEquipment />
      {installedWeapons.length > 0 && (
        <div>
          <label htmlFor="uninstall-weapon">uninstall Weapon: </label>
          <select
            name="uninstall-weapon"
            id="uninstall-weapon"
            onChange={handleUnInstallSelect}
          >
            <option value="">choose a weapon</option>
            {installedWeapons.map((weapon) => (
              <option key={weapon.name + weapon.id} value={weapon.id}>
                {weapon.name} ({weapon.location})
              </option>
            ))}
          </select>
        </div>
      )}

      {unInstalledEquipment.length > 0 && (
        <div id="uninstalled-equipment">
          <h3>Installing Equipment</h3>
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
                            if (
                              equipment.name === "Jump Jet" &&
                              isJumpJetLegal(zone)
                            ) {
                              return;
                            } else {
                              return (
                                <option key={zone} value={zone}>
                                  {zone}
                                </option>
                              );
                            }
                          }
                        )}
                      </select>
                    </td>
                    <td>{equipment.critical}</td>
                    <td>{equipment.tons}</td>
                    <td>
                      {!["Jump Jet", "Heatsink"].includes(equipment.name) && (
                        <button
                          onClick={() => {
                            handleRemoveEquipment(equipment);
                          }}
                        >
                          X
                        </button>
                      )}
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
