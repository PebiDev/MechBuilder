export default {
  id: "ph-1 demo",
  name: "Phoenix Hawk",
  type: "PH-1",
  tonnage: 45,
  reactor: {
    type: "standard",
    value: "270",
    reactorweight: 14.5,
  },
  cockpit: { type: "standard", weight: 3 },
  movement: {
    walking: 6,
    running: 9,
    jumping: 6,
  },
  gyro: { type: "standard", weight: 3 },
  heatsinks: {
    type: "standard",
    number: 10,
  },
  armor: {
    armorweight: 8,
    armorfactor: 128,
    armortype: "standard",
    unassignedpoints: 0,
    internal: {
      type: "standard",
      head: 3,
      ctorso: 14,
      rltorso: 11,
      rlarm: 7,
      rlleg: 11,
    },
    armorvalue: {
      head: 6,
      ctorso: 23,
      ctrear: 5,
      rltorso: 18,
      rltrear: 4,
      rlarm: 10,
      rlleg: 15,
    },
  },
  equipment: {
    weapons: [
      {
        id: "w01",
        name: "Large Laser",
        location: "RA",
        critical: 2,
        tons: 5,
        range: [5, 10, 15],
        damage: 8,
        heat: 8,
      },
      {
        id: "w02",
        name: "Medium Laser",
        location: "RA",
        critical: 1,
        tons: 1,
        range: [3, 6, 9],
        damage: 5,
        heat: 3,
      },
      {
        id: "w03",
        name: "Medium Laser",
        location: "LA",
        critical: 1,
        tons: 1,
        range: [3, 6, 9],
        damage: 5,
        heat: 3,
      },
      {
        id: "w04",
        name: "Machine Gun",
        location: "LA",
        critical: 1,
        tons: 0.5,
        range: [1, 2, 3],
        damage: 2,
        heat: 0,
      },
      {
        id: "w05",
        name: "Machine Gun",
        location: "LA",
        critical: 1,
        tons: 0.5,
        range: [1, 2, 3],
        damage: 2,
        heat: 0,
      },
    ],
    heatsinks: [],
    ammo: [
      {
        id: "ammo01",
        name: "Ammo (MG) 100",
        location: "CT",
        critical: 1,
        tons: 1,
      },
    ],
    jumpjets: [
      { id: "jj01", name: "Jump Jet", location: "RT", critical: 1, tons: 0.5 },
      { id: "jj02", name: "Jump Jet", location: "RT", critical: 1, tons: 0.5 },
      { id: "jj03", name: "Jump Jet", location: "RT", critical: 1, tons: 0.5 },
      { id: "jj04", name: "Jump Jet", location: "LT", critical: 1, tons: 0.5 },
      { id: "jj05", name: "Jump Jet", location: "LT", critical: 1, tons: 0.5 },
      { id: "jj06", name: "Jump Jet", location: "LT", critical: 1, tons: 0.5 },
    ],
    gear: [],
  },
};
