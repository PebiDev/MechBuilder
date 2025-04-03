const DisplayEquipment = ({ equipment }) => {
  return (
    <div id="equipment">
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
          {equipment.weapons.map((weapon) => {
            return (
              <tr key={weapon.id}>
                <td>{weapon.name}</td>
                <td>{weapon.location}</td>
                <td>{weapon.critical}</td>
                <td>{weapon.tons}</td>
              </tr>
            );
          })}
          {equipment.ammo.map((ammo) => {
            return (
              <tr key={ammo.id}>
                <td>{ammo.name}</td>
                <td>{ammo.location}</td>
                <td>{ammo.critical}</td>
                <td>{ammo.tons}</td>
              </tr>
            );
          })}
          {equipment.gear.map((gear) => {
            return (
              <tr key={gear.id}>
                <td>{gear.name}</td>
                <td>{gear.location}</td>
                <td>{gear.critical}</td>
                <td>{gear.tons}</td>
              </tr>
            );
          })}

          {equipment.jumpjets.map((jumpjet) => {
            return (
              <tr key={jumpjet.id}>
                <td>{jumpjet.name}</td>
                <td>{jumpjet.location}</td>
                <td>{jumpjet.critical}</td>
                <td>{jumpjet.tons}</td>
              </tr>
            );
          })}
          {equipment.heatsinks.map((heatsink) => {
            return (
              <tr key={heatsink.id}>
                <td>{heatsink.name}</td>
                <td>{heatsink.location}</td>
                <td>{heatsink.critical}</td>
                <td>{heatsink.tons}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayEquipment;
