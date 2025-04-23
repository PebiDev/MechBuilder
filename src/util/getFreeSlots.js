const getFreeSlots = (zones) => {
  let freeSlots = {};

  for (const [zone, slots] of Object.entries(zones)) {
    let counter = 0;
    for (const [loc, entry] of Object.entries(slots)) {
      if (entry === "") {
        counter++;
      }
      freeSlots[zone] = counter;
    }
  }

  return freeSlots;
};

export default getFreeSlots;
