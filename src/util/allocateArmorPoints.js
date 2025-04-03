function allocateArmorPoints(armorPoints, maxValues) {
  // Initialize result object
  const allocatedPoints = {
    head: 0,
    ctorso: 0,
    ctrear: 0,
    rltorso: 0,
    rltrear: 0,
    rlarm: 0,
    rlleg: 0,
  };

  // Track the total points distributed
  let totalDistributed = 0;

  // Helper function to ensure values do not exceed the max allowed points
  function ensureMax(zone, points) {
    return Math.min(points, maxValues[zone]);
  }

  // Helper function to distribute points between front and rear sections (75%/25% split)
  function distributeFrontRear(zone1, zone2, points) {
    const zone1Points = Math.floor(points * 0.75);
    const zone2Points = points - zone1Points; // Ensure the total adds up
    allocatedPoints[zone1] += ensureMax(zone1, zone1Points);
    allocatedPoints[zone2] += ensureMax(zone2, zone2Points);
    totalDistributed += zone1Points + zone2Points;
  }

  // Step 1: Distribute 80% of points initially
  const headPoints = Math.min(Math.floor(armorPoints * 0.1), maxValues.head);
  allocatedPoints.head += headPoints;
  totalDistributed += headPoints;
  armorPoints -= headPoints;

  const ctorsoPoints = Math.min(
    Math.floor(armorPoints * 0.25),
    maxValues.ctorso
  );
  allocatedPoints.ctorso += ctorsoPoints;
  totalDistributed += ctorsoPoints;
  armorPoints -= ctorsoPoints;

  const rltorsoPoints = Math.min(
    Math.floor(armorPoints * 0.15),
    maxValues.rltorso
  );
  allocatedPoints.rltorso += rltorsoPoints;
  totalDistributed += rltorsoPoints;
  armorPoints -= rltorsoPoints;

  const rllegPoints = Math.min(Math.floor(armorPoints * 0.15), maxValues.rlleg);
  allocatedPoints.rlleg += rllegPoints;
  totalDistributed += rllegPoints;
  armorPoints -= rllegPoints;

  const rlarmPoints = Math.min(
    Math.floor(armorPoints * 0.075),
    maxValues.rlarm
  );
  allocatedPoints.rlarm += rlarmPoints;
  totalDistributed += rlarmPoints;
  armorPoints -= rlarmPoints;

  // Step 2: Handle front and rear splits for certain zones
  distributeFrontRear("ctorso", "ctrear", allocatedPoints.ctorso);
  distributeFrontRear("rltorso", "rltrear", allocatedPoints.rltorso);

  // Step 3: Distribute the remaining points (about 20%) to the zones
  let remainingPoints = armorPoints;

  // We try to allocate any remaining points to the zones without exceeding the max
  while (remainingPoints > 0) {
    let allocatedInThisIteration = false;

    if (remainingPoints > 0 && allocatedPoints.head < maxValues.head) {
      allocatedPoints.head += 1;
      remainingPoints -= 1;
      totalDistributed += 1;
      allocatedInThisIteration = true;
    }

    if (remainingPoints > 0 && allocatedPoints.ctorso < maxValues.ctorso) {
      allocatedPoints.ctorso += 1;
      remainingPoints -= 1;
      totalDistributed += 1;
      allocatedInThisIteration = true;
    }

    if (remainingPoints > 0 && allocatedPoints.ctrear < maxValues.ctrear) {
      allocatedPoints.ctrear += 1;
      remainingPoints -= 1;
      totalDistributed += 1;
      allocatedInThisIteration = true;
    }

    if (remainingPoints > 0 && allocatedPoints.rltorso < maxValues.rltorso) {
      allocatedPoints.rltorso += 1;
      remainingPoints -= 1;
      totalDistributed += 1;
      allocatedInThisIteration = true;
    }

    if (remainingPoints > 0 && allocatedPoints.rltrear < maxValues.rltrear) {
      allocatedPoints.rltrear += 1;
      remainingPoints -= 1;
      totalDistributed += 1;
      allocatedInThisIteration = true;
    }

    if (remainingPoints > 0 && allocatedPoints.rlarm < maxValues.rlarm) {
      allocatedPoints.rlarm += 1;
      remainingPoints -= 1;
      totalDistributed += 1;
      allocatedInThisIteration = true;
    }

    if (remainingPoints > 0 && allocatedPoints.rlleg < maxValues.rlleg) {
      allocatedPoints.rlleg += 1;
      remainingPoints -= 1;
      totalDistributed += 1;
      allocatedInThisIteration = true;
    }

    // If no points could be allocated, break out of the loop
    if (!allocatedInThisIteration) {
      break;
    }
  }

  // Final result combining pairs
  const finalResult = {
    head: allocatedPoints.head,
    ctorso: allocatedPoints.ctorso,
    ctrear: allocatedPoints.ctrear,
    rltorso: allocatedPoints.rltorso, // rtorso is returned as rltorso
    rltrear: allocatedPoints.rltrear, // rtrear is returned as rltrear
    rlarm: allocatedPoints.rlarm, // rarm is returned as rlarm
    rlleg: allocatedPoints.rlleg, // rleg is returned as rlleg
  };

  return finalResult;
}
export default allocateArmorPoints;
