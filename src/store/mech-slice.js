import { createSlice } from "@reduxjs/toolkit";
import internalStructure from "../data/internalStructure";
import reactorValues from "../data/reactorValues";
import { v4 as uuidv4 } from "uuid";

const initialMechState = {
  id: "",
  name: "New Mech",
  type: "",
  tonnage: 0,
  reactor: { reactorType: "standard", reactorValue: 0, reactorweight: 0 },
  movement: { walking: 0, running: 0, jumping: 0 },
  cockpit: { type: "standard", weight: 0 },
  gyro: { type: "standard", weight: 0 },
  heatsinks: { type: "standard", number: 10 },
  armor: {
    armorweight: 0,
    armorfactor: 0,
    armortype: "standard",
    internal: { type: "standard" },
    armorvalue: {},
    unassignedpoints: 0,
  },
  equipment: { weapons: [], heatsinks: [], ammo: [], jumpjets: [], gear: [] },
  remainingTons: null,
  criticalSlots: 47,
  zones: {
    head: {
      freeSlots: 1,
      loc1: "Life Support",
      loc2: "Sensors",
      loc3: "Cockpit",
      loc4: "",
      loc5: "Sensors",
      loc6: "Life Support",
    },
    ctorso: {
      freeSlots: 2,
      loc1: "Reactor",
      loc2: "Reactor",
      loc3: "Reactor",
      loc4: "Gyro",
      loc5: "Gyro",
      loc6: "Gyro",
      loc7: "Gyro",
      loc8: "Reactor",
      loc9: "Reactor",
      loc10: "Reactor",
      loc11: "",
      loc12: "",
    },
    rtorso: {
      freeSlots: 12,
      loc1: "",
      loc2: "",
      loc3: "",
      loc4: "",
      loc5: "",
      loc6: "",
      loc7: "",
      loc8: "",
      loc9: "",
      loc10: "",
      loc11: "",
      loc12: "",
    },
    ltorso: {
      freeSlots: 12,
      loc1: "",
      loc2: "",
      loc3: "",
      loc4: "",
      loc5: "",
      loc6: "",
      loc7: "",
      loc8: "",
      loc9: "",
      loc10: "",
      loc11: "",
      loc12: "",
    },
    rarm: {
      freeSlots: 8,
      loc1: "Shoulder",
      loc2: "Upper Arm Actuator",
      loc3: "Lower Arm Actuator",
      loc4: "Hand Actuator",
      loc5: "",
      loc6: "",
      loc7: "",
      loc8: "",
      loc9: "",
      loc10: "",
      loc11: "",
      loc12: "",
    },
    larm: {
      freeSlots: 8,
      loc1: "Shoulder",
      loc2: "Upper Arm Actuator",
      loc3: "Lower Arm Actuator",
      loc4: "Hand Actuator",
      loc5: "",
      loc6: "",
      loc7: "",
      loc8: "",
      loc9: "",
      loc10: "",
      loc11: "",
      loc12: "",
    },
    rleg: {
      freeSlots: 2,
      loc1: "Hip",
      loc2: "Upper Leg Actuator",
      loc3: "Lower Leg Actuator",
      loc4: "Foot Actuator",
      loc5: "",
      loc6: "",
    },
    lleg: {
      freeSlots: 2,
      loc1: "Hip",
      loc2: "Upper Leg Actuator",
      loc3: "Lower Leg Actuator",
      loc4: "Foot Actuator",
      loc5: "",
      loc6: "",
    },
  },
};

const deepCopy = (o) => JSON.parse(JSON.stringify(o));

const mechSlice = createSlice({
  name: "mech",
  initialState: initialMechState,
  reducers: {
    setName(state, action) {
      let newMech = deepCopy(state);
      newMech.name = action.payload;
      newMech.id = "mech01";
      return newMech;
    },
    reduceRemainingTons(state, action) {
      let newMech = deepCopy(state);
      newMech.remainingTons = newMech.remainingTons - action.payload;
      return newMech;
    },
    increaseRemainingTons(state, action) {
      let newMech = deepCopy(state);

      newMech.remainingTons = newMech.remainingTons + action.payload;
      return newMech;
    },
    setMechTonnage(state, action) {
      let newMech = deepCopy(state);
      newMech = mechSlice.caseReducers.resetMechToInitialState();
      newMech.tonnage = action.payload;
      newMech.remainingTons = action.payload;
      newMech = mechSlice.caseReducers.addInternalStructure(newMech);
      newMech = mechSlice.caseReducers.addCockpit(newMech);

      return newMech;
    },
    addCockpit(state) {
      let newMech = deepCopy(state);

      newMech.cockpit.type = "standard";
      newMech.cockpit.weight = 3;

      newMech.remainingTons = newMech.remainingTons - newMech.cockpit.weight;
      return newMech;
    },
    addGyro(state) {
      let newMech = deepCopy(state);
      if (newMech.gyro.weight > 0) {
        newMech.remainingTons = newMech.remainingTons + newMech.gyro.weight;
        newMech.gyro = {};
      }
      newMech.gyro.type = "standard";
      const gyroWeight = Math.ceil(
        parseInt(newMech.reactor.reactorValue) / 100
      );
      newMech.gyro.weight = gyroWeight;
      newMech.remainingTons = newMech.remainingTons - gyroWeight;
      return newMech;
    },
    addInternalStructure(state) {
      let newMech = deepCopy(state);

      newMech.armor.internal = internalStructure.find(
        (e) => e.tonnage == newMech.tonnage
      );

      if (!newMech.armor.internal.type) {
        newMech.armor.internal.type = "standard";
      }
      newMech.remainingTons =
        newMech.remainingTons - newMech.armor.internal.standardton;

      return newMech;
    },
    addReactor(state, action) {
      let newMech = deepCopy(state);
      //refund previous reactor weight
      if (newMech.reactor.reactorValue > 0) {
        newMech.remainingTons =
          newMech.remainingTons + newMech.reactor.standardTons;
      }

      newMech.movement.walking = parseInt(action.payload);
      newMech.movement.running = Math.round(action.payload * 1.5);
      //adding reactortype
      const reactorType = "standard";
      const reactorValue = action.payload * newMech.tonnage;
      const mechReactor = reactorValues.find(
        (e) => e.reactorValue == reactorValue
      );
      // newMech.reactor = {
      //   value: mechReactor.reactorValue,
      //   type: reactorType,
      //   reactorweight: mechReactor.standardTons,
      // };
      newMech.reactor = { ...mechReactor, reactorType };

      //calculate tons
      newMech.remainingTons =
        newMech.remainingTons - newMech.reactor.standardTons;
      //addGyro
      newMech = mechSlice.caseReducers.addGyro(newMech);
      //determine internal heatsinks
      newMech = mechSlice.caseReducers.internalHeatsinks(newMech);

      return newMech;
    },
    addJumpJets(state, action) {
      let newMech = deepCopy(state);
      if (newMech.movement.jumping > 0) {
        newMech = mechSlice.caseReducers.removeJumpJets(state);
      }
      const numberOfJumpJets = action.payload.numberOfJumpJets;
      const jumpJetWeight = action.payload.jumpJetWeight;

      newMech.movement.jumping = numberOfJumpJets;

      for (let i = 0; i < numberOfJumpJets; i++) {
        newMech.equipment.jumpjets = [
          ...newMech.equipment.jumpjets,
          {
            name: "Jump Jet",
            id: uuidv4(),
            location: "n/a",
            critical: 1,
            tons: jumpJetWeight,
            slots: [],
          },
        ];
      }

      newMech.remainingTons =
        newMech.remainingTons - jumpJetWeight * newMech.movement.jumping;
      newMech.criticalSlots = newMech.criticalSlots - numberOfJumpJets;

      return newMech;
    },
    removeJumpJets(state) {
      let newMech = deepCopy(state);
      newMech.equipment.jumpjets.map((jumpjet) => {
        newMech.remainingTons = newMech.remainingTons + jumpjet.tons;
        newMech.criticalSlots = newMech.criticalSlots + jumpjet.critical;
        jumpjet.slots.map((slot) => {
          newMech.zones[jumpjet.location][slot] = "";
        });
      });
      newMech.equipment.jumpjets = [];
      return newMech;
    },
    addHeatsinks(state, action) {
      let newMech = deepCopy(state);
      const numberOfHeatsinks = parseInt(action.payload);

      if (newMech.heatsinks.number > 10) {
        newMech = mechSlice.caseReducers.removeHeatsinks(state);
      }
      newMech.heatsinks.number = newMech.heatsinks.number + numberOfHeatsinks;
      newMech.remainingTons = newMech.remainingTons - numberOfHeatsinks;
      newMech = mechSlice.caseReducers.internalHeatsinks(newMech);
      return newMech;
    },
    internalHeatsinks(state) {
      let newMech = deepCopy(state);

      const internalHeatsinks = Math.floor(newMech.reactor.reactorValue / 25);
      newMech.criticalSlots =
        newMech.criticalSlots + newMech.equipment.heatsinks.length;

      newMech.equipment.heatsinks.map((heatsink) => {
        heatsink.slots.map((slot) => {
          newMech.zones[heatsink.location][slot] = "";
        });
      });
      newMech.equipment.heatsinks = [];

      if (newMech.heatsinks.number > internalHeatsinks) {
        for (let i = 0; i < newMech.heatsinks.number - internalHeatsinks; i++) {
          newMech.equipment.heatsinks.push({
            name: "Heatsink",
            id: uuidv4(),
            location: "n/a",
            critical: 1,
            tons: 1,
            slots: [],
          });
        }
      }
      newMech.criticalSlots =
        newMech.criticalSlots - newMech.equipment.heatsinks.length;
      return newMech;
    },
    removeHeatsinks(state) {
      let newMech = deepCopy(state);
      const heatSinksToRemove = newMech.heatsinks.number - 10;

      newMech.heatsinks.number = newMech.heatsinks.number - heatSinksToRemove;
      newMech.remainingTons = newMech.remainingTons + heatSinksToRemove;
      return newMech;
    },
    addArmorValueToZone(state, action) {
      let newMech = deepCopy(state);

      const armorPointsToBeAdded = action.payload.armorpoints;
      const zone = action.payload.zone;
      let isPairedZone = false;
      if (
        zone == "rltorso" ||
        zone == "rltrear" ||
        zone == "rlarm" ||
        zone == "rlleg"
      ) {
        isPairedZone = true;
      }
      // console.log(
      //   `addArmorValueToZone: to ${zone} points: ${armorPointsToBeAdded}`
      // );
      if (
        newMech.armor.unassignedpoints < 1 ||
        (isPairedZone && newMech.armor.unassignedpoints < 2)
      ) {
        if (armorPointsToBeAdded > newMech.armor.armorvalue[zone]) {
          return newMech;
        }
      }
      if (newMech.armor.armorvalue[zone] > 0) {
        newMech.armor.unassignedpoints =
          newMech.armor.unassignedpoints + newMech.armor.armorvalue[zone];
        if (isPairedZone) {
          newMech.armor.unassignedpoints =
            newMech.armor.unassignedpoints + newMech.armor.armorvalue[zone];
        }
        newMech.armor.armorvalue[zone] = 0;
      }
      newMech.armor.armorvalue[zone] = armorPointsToBeAdded;

      newMech.armor.unassignedpoints =
        newMech.armor.unassignedpoints - armorPointsToBeAdded;
      if (isPairedZone) {
        newMech.armor.unassignedpoints =
          newMech.armor.unassignedpoints - armorPointsToBeAdded;
      }

      return newMech;
    },
    addArmor(state, action) {
      let newMech = deepCopy(state);

      if (newMech.armor.armorweight > 0) {
        newMech.remainingTons =
          newMech.remainingTons + newMech.armor.armorweight;
        newMech.armor.armorweight = 0;
      }

      newMech.armor.armorfactor = Number(action.payload);

      newMech.armor.armortype = "standard";
      newMech.armor.armorweight =
        Math.ceil(newMech.armor.armorfactor / 8) * 0.5;

      newMech = mechSlice.caseReducers.stripArmor(newMech);
      newMech.remainingTons = newMech.remainingTons - newMech.armor.armorweight;

      return newMech;
    },
    testArmorDistribution(state) {
      let newMech = deepCopy(state);

      let armorPoints = newMech.armor.armorfactor;
      const intern = newMech.armor.internal;

      const maxArmor = {
        head: 9,
        ctorso: intern.ctorso * 2,
        rltorso: intern.rltorso * 2,
        rlarm: intern.rlarm * 2,
        rlleg: intern.rlleg * 2,
      };

      console.log(`max armor: ${JSON.stringify(maxArmor)}`);
      console.log(`armorpoints: ${armorPoints}`);

      // const distArmor = distributePoints(parseInt(armorPoints), maxAmorZones);

      console.log(`distributed armor: ${JSON.stringify(distArmor)}`);
      newMech.armor.armorvalue = distArmor;
      return newMech;
    },
    stripArmor(state) {
      let newMech = deepCopy(state);
      if (newMech.armor.armorweight > 0) {
        newMech.armor.armorvalue = {
          head: 0,
          ctorso: 0,
          ctrear: 0,
          rltorso: 0,
          rltrear: 0,
          rlarm: 0,
          rlleg: 0,
        };
        newMech.armor.unassignedpoints = newMech.armor.armorfactor;
      }
      return newMech;
    },
    maxArmor(state, action) {
      let newMech = deepCopy(state);
      const maxArmor = action.payload.tons;
      if (newMech.armor.armorweight > 0) {
        newMech.remainingTons =
          newMech.remainingTons + newMech.armor.armorweight;
        newMech.armor.armorweight = 0;
      }

      newMech.armor.armorweight = maxArmor;
      newMech.remainingTons = newMech.remainingTons - newMech.armor.armorweight;
      newMech.armor.unassignedpoints = 0;
      newMech.armor.armorfactor = action.payload.value;

      const ctorsoMax = newMech.armor.internal.ctorso * 2;
      const ctorsoFront = Math.floor(ctorsoMax * 0.75);
      const ctorsoRear = ctorsoMax - ctorsoFront;
      const rltorsoMax = newMech.armor.internal.rltorso * 2;
      const rltorsoFront = Math.floor(rltorsoMax * 0.75);
      const rltorsoRear = rltorsoMax - rltorsoFront;

      newMech.armor.armorvalue = {
        head: 9,
        ctorso: ctorsoFront,
        ctrear: ctorsoRear,
        rltorso: rltorsoFront,
        rltrear: rltorsoRear,
        rlarm: newMech.armor.internal.rlarm * 2,
        rlleg: newMech.armor.internal.rlleg * 2,
      };

      return newMech;
    },

    InstallEquipment(state, action) {
      let newMech = deepCopy(state);
      const equipId = action.payload.id;
      const equipZone = action.payload.zone;

      const addEquipmentToZone = (item) => {
        const slots = item.critical;

        const zoneValues = Object.values(newMech.zones[equipZone]);
        const index = zoneValues.findIndex((loc) => {
          return loc === "";
        });
        for (let i = 0; i < slots; i++) {
          if (!zoneValues[index + i] === "") {
            console.log("Component doesn't fit");
            return;
          }
        }
        for (let i = 0; i < slots; i++) {
          let locNumber = Number(index + i);
          let location = `loc` + locNumber;
          item.slots.push(location);
          newMech.zones[equipZone][location] = item.name;
          newMech.zones[equipZone].freeSlots -= 1;
        }
      };

      // change location for the equipment
      for (const [equipmentType, equipments] of Object.entries(
        newMech.equipment
      )) {
        equipments.map((equip, index) => {
          if (equipId === equip.id) {
            addEquipmentToZone(newMech.equipment[equipmentType][index]);
            newMech.equipment[equipmentType][index].location = equipZone;
          }
        });
      }
      return newMech;
    },
    unInstallEquipment(state, action) {
      let newMech = deepCopy(state);
      const unInstallEquipmentId = action.payload;

      for (const [equipmentType, equipments] of Object.entries(
        newMech.equipment
      )) {
        equipments.map((item) => {
          if (item.id == unInstallEquipmentId) {
            newMech.equipment[equipmentType] = equipments.filter(
              (item) => item.id !== unInstallEquipmentId
            );
            item.slots.map((slot) => {
              newMech.zones[item.location][slot] = "";
            });
          }
        });
      }
      return newMech;
    },
    addWeapon(state, action) {
      let newMech = deepCopy(state);
      let weapon = null;
      weapon = { ...action.payload };

      weapon.id = uuidv4();
      weapon.location = "n/a";
      weapon.slots = [];
      newMech.equipment.weapons.push(weapon);
      newMech.remainingTons -= weapon.tons;
      newMech.criticalSlots -= weapon.critical;
      return newMech;
    },
    removeWeapon(state, action) {
      let newMech = deepCopy(state);

      const weapon = action.payload;

      const weapons = newMech.equipment.weapons.filter(
        (item) => item.id !== weapon.id
      );

      newMech.remainingTons += weapon.tons;
      newMech.equipment.weapons = weapons;
      newMech.criticalSlots += weapon.critical;

      return newMech;
    },
    resetMechToInitialState(state) {
      let newMech = deepCopy(initialMechState);
      return newMech;
    },
  },
});

export const mechActions = mechSlice.actions;
export default mechSlice;
