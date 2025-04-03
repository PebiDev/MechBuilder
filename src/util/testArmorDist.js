const testArmorDist = (armorPoints, maxArmor) => {
  let armorTotal = armorPoints;
  const maxArmorArry = maxArmor;
  let armorValues = {
    head: 0,
    ctorso: 0,
    ctrear: 0,
    rltorso: 0,
    rltrear: 0,
    rlarm: 0,
    rlleg: 0,
  };
  let head = 0;
  let ctorso = 0;
  let ctrear = 0;
  let rltorso = 0;
  let rltrear = 0;
  let rlarm = 0;
  let rlleg = 0;

  console.log(
    `hi! total armorpoints:${armorTotal} for ${JSON.stringify(maxArmorArry)}`
  );

  //first assign any leftover points
  let unassignedpoints = armorPoints;
  let leftoverPoints = armorPoints % 16;
  unassignedpoints = armorPoints - leftoverPoints;
  console.log(
    `1. step Leftover:${leftoverPoints} and to be assigned ${unassignedpoints}`
  );
  //second: assign the 16packet
  for (let i = 0; i < armorPoints / 16; i++) {
    unassignedpoints -= 16;
    head = 2;
    ctorso = 3;
    ctrear = 1;
    rltorso = 1;
    rltrear = 1;
    rlarm = 1;
    rlleg = 1;
  }

  return armorValues;
};

export default testArmorDist;
