const DisplayArmor = ({ armor }) => {
  return (
    <div id="display-armor">
      <p>Armor: {armor.armorfactor}</p>
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
            <td>{armor.armorvalue.head}</td>
          </tr>
          <tr>
            <td>Center Torso</td>
            <td>{armor.internal.ctorso}</td>
            <td>{armor.armorvalue.ctorso}</td>
          </tr>
          <tr>
            <td>Center Torso (rear)</td>
            <td></td>
            <td>{armor.armorvalue.ctrear}</td>
          </tr>
          <tr>
            <td>R/L Torso</td>
            <td>{armor.internal.rltorso}</td>
            <td>{armor.armorvalue.rltorso}</td>
          </tr>
          <tr>
            <td>R/L Torso (rear)</td>
            <td></td>
            <td>{armor.armorvalue.rltrear}</td>
          </tr>
          <tr>
            <td>R/L Arm</td>
            <td>{armor.internal.rlarm}</td>
            <td>{armor.armorvalue.rlarm}</td>
          </tr>
          <tr>
            <td>R/L Leg</td>
            <td>{armor.internal.rlleg}</td>
            <td>{armor.armorvalue.rlleg}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default DisplayArmor;
