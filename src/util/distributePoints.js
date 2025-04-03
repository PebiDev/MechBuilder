function distributePoints(points, maxValues) {
  // Helper function to distribute points across front and rear armor, ensuring whole numbers
  function distributeFrontRear(totalPoints, maxPoints, frontRatio = 0.75) {
    const frontPoints = Math.round(
      Math.min(maxPoints * frontRatio, totalPoints * frontRatio)
    );
    const rearPoints = Math.round(
      Math.min(maxPoints - frontPoints, totalPoints - frontPoints)
    );
    return { front: frontPoints, rear: rearPoints };
  }

  // Create an object to hold the allocated points
  const allocatedPoints = {};

  // First, allocate points to the zones with bias in the order: head, ctorso, rleg, lleg
  // Create a total available points variable to handle the remaining points dynamically
  let remainingPoints = points;

  // Allocate points to head first (max value is 9)
  allocatedPoints.head = Math.min(maxValues.head, remainingPoints);
  remainingPoints -= allocatedPoints.head;

  // Allocate points to ctorso (front and rear)
  const ctorsoPoints = Math.min(maxValues.ctorso, remainingPoints);
  const ctorsoDistribution = distributeFrontRear(
    ctorsoPoints,
    maxValues.ctorso
  );
  allocatedPoints.ctorso = ctorsoDistribution.front;
  allocatedPoints.ctrear = ctorsoDistribution.rear;
  remainingPoints -= ctorsoPoints;

  // Allocate points to rtorso and ltorso with 75% bias to front
  const rtorsoPoints = Math.min(maxValues.rtorso, remainingPoints);
  const rtorsoDistribution = distributeFrontRear(
    rtorsoPoints,
    maxValues.rtorso
  );
  //allocatedPoints.rtorso = rtorsoDistribution;
  remainingPoints -= rtorsoPoints;

  const ltorsoPoints = Math.min(maxValues.ltorso, remainingPoints);
  const ltorsoDistribution = distributeFrontRear(
    ltorsoPoints,
    maxValues.ltorso
  );
  allocatedPoints.rltorso = ltorsoDistribution.front;
  allocatedPoints.rltrear = ltorsoDistribution.rear;
  remainingPoints -= ltorsoPoints;

  // Allocate points to rarm and larm, ensuring they have the same points
  const armPoints = Math.round(
    Math.min(maxValues.rarm, maxValues.larm, remainingPoints / 2)
  );
  allocatedPoints.rlarm = armPoints;
  remainingPoints -= armPoints * 2; // Subtract points allocated to both arms

  // Allocate points to rleg and lleg, ensuring they have the same points
  const legPoints = Math.round(
    Math.min(maxValues.rleg, maxValues.lleg, remainingPoints / 2)
  );
  allocatedPoints.rlleg = legPoints;

  remainingPoints -= legPoints * 2; // Subtract points allocated to both legs

  if (remainingPoints === -1) {
    allocatedPoints.ctorso = allocatedPoints.ctorso - remainingPoints;
  }
  if (remainingPoints === 1) {
    allocatedPoints.ctorso = allocatedPoints.ctorso + remainingPoints;
  }
  console.log(remainingPoints);

  // Return the object with the allocated points
  console.log(JSON.stringify(allocatedPoints));

  return allocatedPoints;
}

export default distributePoints;
