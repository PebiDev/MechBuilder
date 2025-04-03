import DisplayArmor from "./DisplayArmor";
import DisplayEquipment from "./DisplayEquipment";
import DisplayMovement from "./DisplayMovement";
import "./DisplayMech.modules.css";

export default function DisplayMech({ mech }) {
  return (
    <div id="display-mech">
      <h2>
        {mech.type} {mech.name}
      </h2>

      <div id="mech-data">
        <p>Tonnage: {mech.tonnage}</p>
        <p id="reactor">
          Reactor:{" "}
          {mech.reactor.reactorValue > 0 && (
            <span>
              {mech.reactor.reactorType} {mech.reactor.reactorValue}
            </span>
          )}
        </p>
        <DisplayMovement
          walkingMP={mech.movement.walking}
          runningMP={mech.movement.running}
          jumpingMP={mech.movement.jumping}
        />
        <p>Heatsinks: {mech.heatsinks.number}</p>
        <DisplayArmor armor={mech.armor} />
        <DisplayEquipment equipment={mech.equipment} />
      </div>
    </div>
  );
}
