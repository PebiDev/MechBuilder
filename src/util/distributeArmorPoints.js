function distributeArmor(armorFactor, maxValues) {
  const result = {
    head: 0,
    ctorso: 0,
    ctrear: 0,
    rltorso: 0,
    rltrear: 0,
    rlarm: 0,
    rlleg: 0,
  };

  let remaining = armorFactor;

  // Assigning head to max
  const headArmor = Math.min(9, maxValues.head, remaining);
  result.head = headArmor;
  remaining -= headArmor;

  //  weight percentages for hit locations
  const weights = {
    ctorso: 0.25,
    ctrear: 0.03,
    rltorso: 0.1,
    rltrear: 0.02,
    rlarm: 0.08,
    rlleg: 0.125,
  };

  const totalWeight =
    weights.ctorso +
    weights.ctrear +
    weights.rltorso * 2 +
    weights.rltrear * 2 +
    weights.rlarm * 2 +
    weights.rlleg * 2;

  const desired = {};
  for (const [zone, weight] of Object.entries(weights)) {
    const zoneCount = ["rltorso", "rltrear", "rlarm", "rlleg"].includes(zone)
      ? 2
      : 1;
    const weightedPoints = (weight / totalWeight) * remaining;
    const perSide = Math.round(weightedPoints / zoneCount);
    desired[zone] = perSide;
  }

  // Apply values
  for (const [zone, amount] of Object.entries(desired)) {
    const zoneCount = ["rltorso", "rltrear", "rlarm", "rlleg"].includes(zone)
      ? 2
      : 1;
    const assignable = Math.min(amount, maxValues[zone]);
    result[zone] = assignable;
    remaining -= assignable * zoneCount;
  }

  // Spend any leftover armor
  const zones = Object.keys(result);
  while (remaining > 0) {
    let distributed = false;
    for (const zone of zones) {
      const zoneCount = ["rltorso", "rltrear", "rlarm", "rlleg"].includes(zone)
        ? 2
        : 1;
      if (result[zone] < maxValues[zone] && remaining >= zoneCount) {
        result[zone]++;
        remaining -= zoneCount;
        distributed = true;
      }
    }
    if (!distributed) break;
  }

  // Final correction for single point loss due to rounding
  if (remaining === 1) {
    if (result.ctorso < maxValues.ctorso) {
      result.ctorso += 1;
      remaining -= 1;
    } else if (result.ctorso > 0) {
      const reassignTargets = ["rltorso", "rlleg", "rlarm"];
      for (const zone of reassignTargets) {
        if (result[zone] < maxValues[zone]) {
          result.ctorso -= 1;
          result[zone] += 1;
          remaining -= 1;
          break;
        }
      }
    }
  }

  return result;
}

export default distributeArmor;
