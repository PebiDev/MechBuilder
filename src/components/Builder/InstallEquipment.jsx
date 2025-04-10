import { useSelector, useDispatch } from "react-redux";
import { mechActions } from "../../store/mech-slice";

const InstallEquipment = () => {
  const dispatch = useDispatch();
  const mech = useSelector((state) => state.mech);

  const unInstalledEquipment = [];

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
  //console.log(unInstalledEquipment);
  let zonesWithFreeSlots = [];

  let freeCritSlots = 0;
  for (const [zones, hitLocation] of Object.entries(mech.zones)) {
    let hitZone = { zone: zones, freeLocs: null };
    for (const [key, value] of Object.entries(hitLocation)) {
      if (key == "freeSlots") {
        freeCritSlots += value;
        console.log(JSON.stringify(value));
      }
      if (value == "") {
        hitZone.freeLocs = key;
        //zonesWithFreeSlots.push({ zones: key });
        zonesWithFreeSlots.push(hitZone);
      }
      //console.log(`${JSON.stringify(key1)} ${JSON.stringify(val1)}`);
    }

    //console.log(`${JSON.stringify(key)} ${JSON.stringify(value)}`);
    //console.log(`${JSON.stringify(key)}`);
  }
  console.log(freeCritSlots);
  console.log(JSON.stringify(zonesWithFreeSlots));

  const handleLocation = () => {
    log.console("hi");
  };
  return (
    <div id="install-equipment">
      <div id="critical-slots">
        remaining Critical Slots: {mech.criticalSlots}
      </div>
      {unInstalledEquipment.length > 0 && (
        <div id="uninstalled-equipment">
          <table id="equipment-table">
            <thead>
              <tr>
                <th>Weapons and Ammo</th>
                <th>Location</th>
                <th>Critical</th>
                <th>Tonnage</th>
              </tr>
            </thead>
            <tbody>
              {unInstalledEquipment.map((equipment) => {
                return (
                  <tr key={equipment.id}>
                    <td>{equipment.name}</td>
                    <td>{equipment.location}</td>
                    <td>{equipment.critical}</td>
                    <td>{equipment.tons}</td>
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
