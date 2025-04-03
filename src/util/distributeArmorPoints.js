function allocateArmorPoints(totalPoints, maxValues) {
  // Initialize result object
  const allocatedPoints = {
    head: 0,
    ctorso: 0,
    ctrear: 0,
    rltorso: 0,
    rlrear: 0,
    rlarm: 0,
    rlleg: 0,
  };

  // Helper function to ensure the values are even for specified zones
  function adjustForEvenZones(zone, points) {
    if (["rltorso", "rlrear", "rlarm", "rlleg"].includes(zone)) {
      return points % 2 === 0 ? points : points - 1; // Ensure even values
    }
    return points;
  }

  // Helper function to distribute points to ctorso and rltorso, respecting the 75-25 rule
  function distributeTorsoPoints(remainingPoints, maxValues) {
    let allocatedCtorso = 0;
    let allocatedRltorso = 0;
    const torsoMax = maxValues.ctorso;
    const rltorsoMax = maxValues.rltorso;

    // First, allocate the main torso points (ctorso and rltorso)
    allocatedCtorso = Math.min(remainingPoints * 0.75, torsoMax); // Roughly 75% of the points to ctorso
    allocatedRltorso = Math.min(remainingPoints * 0.25, rltorsoMax); // Roughly 25% of the points to rltorso

    // Adjust allocations if there are any remaining points that should be added to the remaining zone
    const totalAllocated = allocatedCtorso + allocatedRltorso;
    remainingPoints -= totalAllocated;

    // Allocate points to the corresponding rear zones
    const allocatedCtrear = Math.min(allocatedCtorso * 0.25, maxValues.ctrear); // 25% of the ctorso value to ctrear
    const allocatedRlrear = Math.min(allocatedRltorso * 0.25, maxValues.rlrear); // 25% of the rltorso value to rlrear

    return {
      remainingPoints,
      allocatedCtorso,
      allocatedCtrear,
      allocatedRltorso,
      allocatedRlrear,
    };
  }

  // Main allocation loop
  let remainingPoints = totalPoints;

  // Step 1: Distribute points to the torso and rear zones first
  const torsoAllocation = distributeTorsoPoints(remainingPoints, maxValues);
  allocatedPoints.ctorso = torsoAllocation.allocatedCtorso;
  allocatedPoints.ctrear = torsoAllocation.allocatedCtrear;
  allocatedPoints.rltorso = torsoAllocation.allocatedRltorso;
  allocatedPoints.rlrear = torsoAllocation.allocatedRlrear;
  remainingPoints = torsoAllocation.remainingPoints;

  // Step 2: Allocate points to the other zones based on the remaining points
  const distributionRatio = {
    head: 2,
    ctorso: 3,
    ctrear: 1,
    rltorso: 2,
    rlrear: 1,
    rlarm: 1,
    rlleg: 2,
  };

  // We continue allocating points based on the distribution ratios
  while (remainingPoints >= 18) {
    // Allocate 18 points based on the ratio
    Object.keys(distributionRatio).forEach((zone) => {
      const pointsToAllocate = distributionRatio[zone];
      if (
        zone !== "ctorso" &&
        zone !== "rltorso" &&
        allocatedPoints[zone] + pointsToAllocate <= maxValues[zone]
      ) {
        allocatedPoints[zone] += pointsToAllocate;
        remainingPoints -= pointsToAllocate;
      }
    });
  }

  // Step 3: Handle any remaining points less than 18 but greater than 0
  while (remainingPoints > 0) {
    for (let zone in distributionRatio) {
      if (remainingPoints <= 0) break;
      const max = maxValues[zone];
      let pointsToAllocate = distributionRatio[zone];

      // Ensure that the points allocated don't exceed the max for that zone
      if (allocatedPoints[zone] + pointsToAllocate <= max) {
        allocatedPoints[zone] += pointsToAllocate;
        remainingPoints -= pointsToAllocate;
      } else {
        // Adjust if allocating points exceeds max
        const availablePoints = max - allocatedPoints[zone];
        allocatedPoints[zone] = max;
        remainingPoints -= availablePoints;
      }
    }
  }

  // Handle any leftover odd points (odd number should be added to ctorso)
  if (remainingPoints % 2 !== 0) {
    const pointsToAddToCtorso = Math.min(
      remainingPoints,
      maxValues.ctorso - allocatedPoints.ctorso
    );
    allocatedPoints.ctorso += pointsToAddToCtorso;
    remainingPoints -= pointsToAddToCtorso;
  }

  // Adjust zones for even values
  for (let zone in allocatedPoints) {
    allocatedPoints[zone] = adjustForEvenZones(zone, allocatedPoints[zone]);
  }

  // Return the final allocation
  return allocatedPoints;
}

// Example usage
// const armorPoints = 88; // Example points
// const maxZoneValues = {
//   head: 9,        // Head zone max value
//   ctorso: 22,     // Ctorso max value
//   ctrear: 22,     // Ctrear max value
//   rltorso: 16,    // Rltorso max value
//   rlrear: 16,     // Rlrear max value
//   rlarm: 12,      // Rlarm max value
//   rlleg: 16       // Rlleg max value
// };

const allocatedArmor = allocateArmorPoints(armorPoints, maxZoneValues);
console.log(allocatedArmor);

export default allocateArmorPoints;
