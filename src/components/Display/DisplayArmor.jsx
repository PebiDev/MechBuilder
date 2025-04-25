const DisplayArmor = ({ armor }) => {
  return (
    <div id="display-armor">
      <p>Armor: {armor.armorFactor}</p>
      <table id="armor-table" className="armor-table">
        <thead>
          <tr>
            <th></th>
            <th>
              Internal <br />
              Structure
            </th>
            <th>
              Armor <br />
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Head</td>
            <td>{armor.internal.head}</td>
            <td>{armor.armorValue.head}</td>
          </tr>
          <tr>
            <td>Center Torso</td>
            <td>{armor.internal.ctorso}</td>
            <td>{armor.armorValue.ctorso}</td>
          </tr>
          <tr>
            <td>Center Torso (rear)</td>
            <td></td>
            <td>{armor.armorValue.ctrear}</td>
          </tr>
          <tr>
            <td>R/L Torso</td>
            <td>{armor.internal.rltorso}</td>
            <td>{armor.armorValue.rltorso}</td>
          </tr>
          <tr>
            <td>R/L Torso (rear)</td>
            <td></td>
            <td>{armor.armorValue.rltrear}</td>
          </tr>
          <tr>
            <td>R/L Arm</td>
            <td>{armor.internal.rlarm}</td>
            <td>{armor.armorValue.rlarm}</td>
          </tr>
          <tr>
            <td>R/L Leg</td>
            <td>{armor.internal.rlleg}</td>
            <td>{armor.armorValue.rlleg}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DisplayArmor;
