const assignEquipmentId = (equipList, equipmentName) => {
  let equipCounter = 0;

  if (equipList) {
    equipList.map((weapon) => {
      for (const [key, value] of Object.entries(weapon)) {
        if (value === equipmentName) {
          equipCounter++;
        }
      }
    });
  }

  const number = equipCounter + 1;
  const id = equipmentName + 0 + number;

  return id;
};

export default assignEquipmentId;
