import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";
import ShowEquipment from "./ShowEquipment";
import getFreeSlots from "../../util/getFreeSlots";
import AdvancedRemoveHand from "../Advanced-Builder/AdvancedRemoveHand";
import { useMemo, useCallback } from "react";

const InstallEquipment = () => {
  const dispatch = useDispatch();

  const equipment = useSelector((state) => state.mech.equipment);
  const zones = useSelector((state) => state.mech.zones);
  const chassisType = useSelector((state) => state.mech.chassisType);
  const armorType = useSelector((state) => state.mech.armor.armorType);
  const advancedOptions = useSelector((state) => state.ui.advancedOptions);

  const { unInstalledEquipment, unInstalledWeapons, installedWeapons } =
    useMemo(() => {
      const unInstalledEquipment = [];
      const unInstalledWeapons = [];
      const installedWeapons = [];

      equipment.heatsinks.forEach((item) => {
        if (item.location === "n/a") unInstalledEquipment.push(item);
      });
      equipment.jumpjets.forEach((item) => {
        if (item.location === "n/a") unInstalledEquipment.push(item);
      });
      equipment.weapons.forEach((item) => {
        if (item.location === "n/a") {
          unInstalledEquipment.push(item);
          unInstalledWeapons.push(item);
        } else {
          installedWeapons.push(item);
        }
      });
      equipment.ammo.forEach((item) => {
        if (item.location === "n/a") {
          unInstalledEquipment.push(item);
        } else {
          installedWeapons.push(item);
        }
      });
      equipment.gear.forEach((item) => {
        if (item.location === "n/a") unInstalledEquipment.push(item);
      });

      return { unInstalledEquipment, unInstalledWeapons, installedWeapons };
    }, [equipment]);

  const getZonesWithFreeSlots = useCallback(
    (criticalSlots) => {
      const zonesWithFreeSlots = [];
      const freeSlots = getFreeSlots(zones);

      for (const [zone, slots] of Object.entries(freeSlots)) {
        if (slots >= criticalSlots) zonesWithFreeSlots.push(zone);
      }
      if (criticalSlots > 7 && chassisType === "Bipedal") {
        if (freeSlots["rarm"] + freeSlots["rtorso"] >= criticalSlots) {
          zonesWithFreeSlots.push("rarm/rtorso");
        }
        if (freeSlots["larm"] + freeSlots["ltorso"] >= criticalSlots) {
          zonesWithFreeSlots.push("larm/ltorso");
        }
      }
      if (criticalSlots > 7) {
        if (freeSlots["ctorso"] + freeSlots["rtorso"] >= criticalSlots) {
          zonesWithFreeSlots.push("ctorso/rtorso");
        }
        if (freeSlots["ctorso"] + freeSlots["ltorso"] >= criticalSlots) {
          zonesWithFreeSlots.push("ctorso/ltorso");
        }
      }
      return zonesWithFreeSlots;
    },
    [zones, chassisType]
  );

  const isJumpJetLegal = (zone) => ["rarm", "larm", "head"].includes(zone);

  const isZoneIllegalForEquip = (zone, equipment) => {
    if (equipment.name.includes("Jump Jet") && isJumpJetLegal(zone))
      return true;
    if (equipment.category === "Melee Weapon" && !zone.includes("arm"))
      return true;
    return false;
  };

  const checkIsUninstallAllowed = useCallback(
    (equipment) => {
      if (
        [
          "Jump Jet",
          "Heatsink",
          "Double Heatsink",
          "Improved Jump Jet",
        ].includes(equipment.name)
      )
        return false;
      if (equipment.name === "Guardian ECM" && armorType === "Stealth Armor")
        return false;
      return true;
    },
    [armorType]
  );

  const handleZoneSelect = useCallback(
    (event) => {
      const equipId = event.target.id;
      const equipToZone = event.target.value;
      if (equipToZone.includes("/")) {
        dispatch(
          mechActions.addSplitZoneWeapon({ id: equipId, zones: equipToZone })
        );
      } else {
        dispatch(
          mechActions.InstallEquipment({ id: equipId, zone: equipToZone })
        );
      }
    },
    [dispatch]
  );

  const handleRemoveEquipment = useCallback(
    (equip) => {
      dispatch(mechActions.removeEquipment(equip));
    },
    [dispatch]
  );

  const handleUnInstallSelect = useCallback(
    (event) => {
      const weaponId = event.target.value;
      dispatch(mechActions.unInstallEquipment(weaponId));
    },
    [dispatch]
  );

  const handleSplitZones = useCallback(
    (weapon, slotsLeft, slotsRight) => {
      dispatch(
        mechActions.installSplitZoneWeapon({
          weapon,
          slotsZoneA: slotsLeft,
          slotsZoneB: slotsRight,
        })
      );
    },
    [dispatch]
  );

  return (
    <div id="install-equipment" className="form-element">
      {advancedOptions && chassisType === "Bipedal" && <AdvancedRemoveHand />}
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
              {unInstalledEquipment.map((equipment) => (
                <tr key={equipment.id}>
                  <td>{equipment.name}</td>
                  <td>
                    <select
                      id={equipment.id}
                      name={equipment.id}
                      onChange={handleZoneSelect}
                    >
                      <option defaultValue>n/a</option>
                      {getZonesWithFreeSlots(equipment.critical).map((zone) =>
                        isZoneIllegalForEquip(zone, equipment) ? null : (
                          <option key={zone} value={zone}>
                            {zone}
                          </option>
                        )
                      )}
                    </select>
                  </td>
                  <td>{equipment.critical}</td>
                  <td>{equipment.tons}</td>
                  <td>
                    {checkIsUninstallAllowed(equipment) && (
                      <button onClick={() => handleRemoveEquipment(equipment)}>
                        X
                      </button>
                    )}
                    {equipment.splitZones && (
                      <>
                        <label htmlFor={equipment.name}>
                          {equipment.splitZones[0] +
                            "/" +
                            equipment.splitZones[1]}
                        </label>
                        <select
                          id={equipment.name}
                          name={equipment.name}
                          onChange={(e) => {
                            const [left, right] = e.target.value
                              .split("/")
                              .map(Number);
                            handleSplitZones(equipment, left, right);
                          }}
                        >
                          {Array.from(
                            { length: equipment.critical - 1 },
                            (_, i) => {
                              const left = i + 1;
                              const right = equipment.critical - left;
                              const free = getFreeSlots(zones);
                              const maxLeft = free[equipment.splitZones[0]];
                              const maxRight = free[equipment.splitZones[1]];
                              if (left > maxLeft || right > maxRight)
                                return null;
                              return (
                                <option
                                  key={`${left}/${right}`}
                                  value={`${left}/${right}`}
                                >
                                  {left}/{right}
                                </option>
                              );
                            }
                          )}
                        </select>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default InstallEquipment;
