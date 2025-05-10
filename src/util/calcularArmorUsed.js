function calculateArmorUsed(armorObject) {
  const pairedZones = ["rltorso", "rltrear", "rlarm", "rlleg"];

  return Object.entries(armorObject).reduce((sum, [zone, value]) => {
    const isPaired = pairedZones.includes(zone);
    return sum + (isPaired ? value * 2 : value);
  }, 0);
}
