import { createSlice } from "@reduxjs/toolkit";
import internalStructure from "../data/internalStructure";
import reactorValues from "../data/reactorValues";
import { v4 as uuidv4 } from "uuid";
import distributeArmorPoints from "../util/distributeArmorPoints";
import {
  structureTable,
  structureClan,
} from "../data/alphaStrike/asStructureValues";

const zonesBiped = {
  head: {
    loc1: "Life Support",
    loc2: "Sensors",
    loc3: "Cockpit",
    loc4: "",
    loc5: "Sensors",
    loc6: "Life Support",
  },
  ctorso: {
    loc1: "Fusion Engine",
    loc2: "Fusion Engine",
    loc3: "Fusion Engine",
    loc4: "Gyro",
    loc5: "Gyro",
    loc6: "Gyro",
    loc7: "Gyro",
    loc8: "Fusion Engine",
    loc9: "Fusion Engine",
    loc10: "Fusion Engine",
    loc11: "",
    loc12: "",
  },
  rtorso: {
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
    loc1: "Hip",
    loc2: "Upper Leg Actuator",
    loc3: "Lower Leg Actuator",
    loc4: "Foot Actuator",
    loc5: "",
    loc6: "",
  },
  lleg: {
    loc1: "Hip",
    loc2: "Upper Leg Actuator",
    loc3: "Lower Leg Actuator",
    loc4: "Foot Actuator",
    loc5: "",
    loc6: "",
  },
};
const zonesQuad = {
  head: {
    loc1: "Life Support",
    loc2: "Sensors",
    loc3: "Cockpit",
    loc4: "",
    loc5: "Sensors",
    loc6: "Life Support",
  },
  ctorso: {
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
  frleg: {
    loc1: "Hip",
    loc2: "Upper Leg Actuator",
    loc3: "Lower Leg Actuator",
    loc4: "Foot Actuator",
    loc5: "",
    loc6: "",
  },
  flleg: {
    loc1: "Hip",
    loc2: "Upper Leg Actuator",
    loc3: "Lower Leg Actuator",
    loc4: "Foot Actuator",
    loc5: "",
    loc6: "",
  },
  rrleg: {
    loc1: "Hip",
    loc2: "Upper Leg Actuator",
    loc3: "Lower Leg Actuator",
    loc4: "Foot Actuator",
    loc5: "",
    loc6: "",
  },
  rlleg: {
    loc1: "Hip",
    loc2: "Upper Leg Actuator",
    loc3: "Lower Leg Actuator",
    loc4: "Foot Actuator",
    loc5: "",
    loc6: "",
  },
};

const initialMechState = {
  id: "",
  name: "New Mech",
  chassisType: "Bipedal",
  technologyBase: "Inner Sphere",
  mechType: "",
  tonnage: "",
  internalStructure: "Standard",
  cockpit: { type: "Standard Cockpit", weight: 3 },
  reactor: { reactorType: "standard", reactorValue: 0, reactorweight: 0 },
  movement: { walking: "", running: "", jumping: "" },

  gyro: { type: "Standard", weightMultiplier: 0 },
  heatsinks: { type: "standard", heatsinkCritSlots: 1, number: 10 },
  armor: {
    armorWeight: 0,
    armorFactor: 0,
    armorType: "Standard",
    armorBasePointsMultiplier: 1,
    armorSlots: 0,
    internal: { type: "Standard" },
    armorValue: {},
    unassignedPoints: 0,
  },
  equipment: { weapons: [], heatsinks: [], ammo: [], jumpjets: [], gear: [] },
  remainingTons: null,
  criticalSlots: 47,
  zones: zonesBiped,
  alphaStrikeData: {},
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
    setChassisType(state, action) {
      let newMech = deepCopy(state);
      newMech = mechSlice.caseReducers.resetMechToInitialState();
      //should be "BattleMech" or "QuadMech"
      const chassisType = action.payload;
      newMech.chassisType = chassisType;
      if (newMech.chassisType === "Quad") {
        newMech.zones = zonesQuad;
        newMech.criticalSlots = 35;
      }
      if (newMech.chassisType === "Bipedal") {
        newMech.zones = zonesBiped;
        newMech.criticalSlots = 47;
      }

      return newMech;
    },
    setMechType(state, action) {
      let newMech = deepCopy(state);
      //should be "Standard" or "OmniMech"
      const mechType = action.payload;
      newMech.mechType = mechType;
      return newMech;
    },
    setTechnologyBase(state, action) {
      let newMech = deepCopy(state);
      newMech = mechSlice.caseReducers.resetMechToInitialState();
      //should be "Inner Sphere" or "Clan"
      const techBase = action.payload;
      newMech.technologyBase = techBase;
      return newMech;
    },
    setMechTonnage(state, action) {
      let newMech = deepCopy(state);
      const technologyBase = state.technologyBase;
      const chassisType = state.chassisType;
      const name = state.name;
      const criticalSlots = state.criticalSlots;
      let zones = "";
      chassisType === "Bipedal" ? (zones = zonesBiped) : (zones = zonesQuad);
      newMech = {
        ...initialMechState,
        technologyBase,
        chassisType,
        criticalSlots,
        zones,
        name,
      };

      newMech.id = uuidv4();
      newMech.tonnage = action.payload;
      newMech.remainingTons = action.payload;
      newMech = mechSlice.caseReducers.addInternalStructure(newMech);
      newMech = mechSlice.caseReducers.addCockpit(newMech);

      return newMech;
    },
    addCockpit(state) {
      let newMech = deepCopy(state);

      newMech.cockpit.type = "Standard Cockpit";
      newMech.cockpit.weight = 3;

      newMech.remainingTons = newMech.remainingTons - newMech.cockpit.weight;
      return newMech;
    },
    setCockpit(state, action) {
      let newMech = deepCopy(state);
      const newCockpit = action.payload;
      const oldCockpitWeight = newMech.cockpit.weight;
      if (newCockpit === "Small Cockpit") {
        newMech.cockpit.type = "Small Cockpit";
        newMech.cockpit.weight = 2;
        newMech.remainingTons += oldCockpitWeight - newMech.cockpit.weight;
        newMech.zones.head.loc6 = "";
      }
      if (newCockpit === "Standard Cockpit") {
        newMech.cockpit.type = "Standard Cockpit";
        newMech.cockpit.weight = 3;
        newMech.remainingTons += oldCockpitWeight - newMech.cockpit.weight; //hard coded difference!
        newMech.zones.head.loc6 = "Life Support";
      }

      return newMech;
    },
    addGyro(state) {
      let newMech = deepCopy(state);
      if (newMech.gyro.weight > 0) {
        newMech.remainingTons = newMech.remainingTons + newMech.gyro.weight;
        newMech.gyro = {};
      }
      newMech.gyro.type = "Standard";
      newMech.gyro.weightMultiplier = 1;
      const gyroWeight =
        Math.ceil(parseInt(newMech.reactor.reactorValue) / 100) *
        newMech.gyro.weightMultiplier;
      newMech.gyro.weight = gyroWeight;
      newMech.remainingTons -= gyroWeight;
      return newMech;
    },
    setGyro(state, action) {
      let newMech = deepCopy(state);
      const newGyroType = action.payload;

      const gyro = newMech.gyro;
      const gyroSlots = ["loc4", "loc5", "loc6", "loc7"];

      newMech.remainingTons += gyro.weight;

      if (gyro.type === "Heavy-Duty") {
      }
      if (gyro.type === "Compact") {
      }
      if (gyro.type === "Extra-Light") {
        newMech.zones.ctorso.loc11 = "";
        newMech.zones.ctorso.loc12 = "";
      }

      gyro.type = newGyroType;
      if (newGyroType === "Standard") {
        gyro.weightMultiplier = 1;
        gyroSlots.map((gyroSlot) => {
          newMech.zones.ctorso[gyroSlot] = "Gyro";
        });
      }

      if (newGyroType === "Heavy-Duty") {
        gyro.weightMultiplier = 2;
        gyroSlots.map((gyroSlot) => {
          newMech.zones.ctorso[gyroSlot] = "Heavy-Duty Gyro";
        });
      }
      if (newGyroType === "Compact") {
        gyro.weightMultiplier = 1.5;
        newMech.zones.ctorso.loc4 = "Compact Gyro";
        newMech.zones.ctorso.loc5 = "Compact Gyro";
        newMech.zones.ctorso.loc6 = "";
        newMech.zones.ctorso.loc7 = "";
      }
      if (newGyroType === "Extra-Light") {
        gyro.weightMultiplier = 0.5;
        gyroSlots.push(...["loc11", "loc12"]);
        gyroSlots.map((gyroSlot) => {
          newMech.zones.ctorso[gyroSlot] = "Extra Light Gyro";
        });
      }

      const gyroWeight =
        Math.ceil(parseInt(newMech.reactor.reactorValue) / 100) *
        Number(gyro.weightMultiplier);
      newMech.gyro.weight = Number(gyroWeight);
      newMech.remainingTons -= newMech.gyro.weight;

      return newMech;
    },
    setInternalStructure(state, action) {
      let newMech = deepCopy(state);
      const internalStructure = action.payload;

      if (newMech.internalStructure === "Endo Steel") {
        //standard internal Structure is already substracted in setMechTonnage
        newMech.remainingTons -= newMech.armor.internal.endosteel;

        if (newMech.technologyBase === "Clan") newMech.criticalSlots += 7;
        else {
          newMech.criticalSlots += 14;
        }
      }

      newMech.internalStructure = internalStructure;

      if (newMech.internalStructure === "Endo Steel") {
        newMech.remainingTons += newMech.armor.internal.endosteel;
        if (newMech.technologyBase === "Clan") newMech.criticalSlots -= 7;
        else {
          newMech.criticalSlots -= 14;
        }
      }
      return newMech;
    },
    addInternalStructure(state) {
      let newMech = deepCopy(state);
      newMech.armor.internal = {};

      newMech.armor.internal = internalStructure.find(
        (e) => e.tonnage == newMech.tonnage
      );
      if (newMech.chassisType === "Quad") {
        newMech.armor.internal.frlleg = newMech.armor.internal.rlleg;
        newMech.armor.internal.rrlleg = newMech.armor.internal.rlleg;
        delete newMech.armor.internal.rlarm;
        delete newMech.armor.internal.rlleg;
      }

      let maximumArmor =
        9 +
        newMech.armor.internal.ctorso * 2 +
        newMech.armor.internal.rltorso * 4;

      if (newMech.chassisType === "Quad") {
        maximumArmor += newMech.armor.internal.frlleg * 8;
      } else {
        maximumArmor +=
          newMech.armor.internal.rlarm * 4 + newMech.armor.internal.rlleg * 4;
      }

      newMech.armor.internal.maxArmor = maximumArmor;

      if (newMech.internalStructure === "Endo Steel") {
        newMech.remainingTons -= newMech.armor.internal.endosteel;
      } else {
        newMech.remainingTons -= newMech.armor.internal.standardton;
      }

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
      const reactorType = "Standard";
      const reactorValue = action.payload * newMech.tonnage;
      const mechReactor = reactorValues.find(
        (e) => e.reactorValue == reactorValue
      );
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
    setReactorType(state, action) {
      let newMech = deepCopy(state);
      //newMech = mechSlice.caseReducers.unInstallAllFromCTorso(newMech);
      const newReactorType = action.payload;
      const reactor = newMech.reactor;
      const ctReactorLocs = ["loc1", "loc2", "loc3", "loc8", "loc9", "loc10"];

      if (reactor.reactorType === "Standard") {
        newMech.remainingTons += reactor.standardTons;
      }
      if (reactor.reactorType === "XL") {
        newMech.remainingTons += reactor.xlTons;
        newMech.criticalSlots += 4;
        newMech.zones.rtorso.loc1 = "";
        newMech.zones.rtorso.loc2 = "";
        newMech.zones.ltorso.loc1 = "";
        newMech.zones.ltorso.loc2 = "";
        if (newMech.technologyBase === "Inner Sphere") {
          newMech.criticalSlots += 2;
          newMech.zones.rtorso.loc3 = "";
          newMech.zones.ltorso.loc3 = "";
        }
      }
      if (reactor.reactorType === "Compact") {
        newMech.remainingTons += reactor.compact;
        newMech.criticalSlots -= 3;
        newMech.zones.ctorso.loc8 = "Reactor";
        newMech.zones.ctorso.loc9 = "Reactor";
        newMech.zones.ctorso.loc10 = "Reactor";
      }
      if (reactor.reactorType === "Light") {
        newMech.remainingTons += reactor.light;
        newMech.criticalSlots += 4;
        newMech.zones.rtorso.loc1 = "";
        newMech.zones.rtorso.loc2 = "";
        newMech.zones.ltorso.loc1 = "";
        newMech.zones.ltorso.loc2 = "";
      }

      if (newReactorType === "Standard") {
        newMech.remainingTons -= reactor.standardTons;
        ctReactorLocs.map((loc) => {
          newMech.zones.ctorso[loc] = "Fusion Engine";
        });
      }
      if (newReactorType === "XL") {
        reactor.reactorType = "XL";
        newMech.remainingTons -= reactor.xlTons;
        newMech.criticalSlots -= 4;

        ctReactorLocs.map((loc) => {
          newMech.zones.ctorso[loc] = "XL Engine";
        });
        newMech.zones.rtorso.loc1 = "XL Engine";
        newMech.zones.rtorso.loc2 = "XL Engine";
        newMech.zones.ltorso.loc1 = "XL Engine";
        newMech.zones.ltorso.loc2 = "XL Engine";
        if (newMech.technologyBase === "Inner Sphere") {
          newMech.criticalSlots -= 2;
          newMech.zones.rtorso.loc3 = "XL Engine";
          newMech.zones.ltorso.loc3 = "XL Engine";
        }
      }
      if (newReactorType === "Compact") {
        reactor.reactorType = "Compact";
        newMech.remainingTons -= reactor.compact;
        newMech.criticalSlots += 3;
        ctReactorLocs.map((loc) => {
          newMech.zones.ctorso[loc] = "Compact Engine";
        });
        newMech.zones.ctorso.loc8 = "";
        newMech.zones.ctorso.loc9 = "";
        newMech.zones.ctorso.loc10 = "";
      }
      if (newReactorType === "Light") {
        reactor.reactorType = "Light";
        newMech.remainingTons -= reactor.light;
        newMech.criticalSlots -= 4;
        ctReactorLocs.map((loc) => {
          newMech.zones.ctorso[loc] = "Light Engine";
        });
        newMech.zones.rtorso.loc1 = "Light Engine";
        newMech.zones.rtorso.loc2 = "Light Engine";
        newMech.zones.ltorso.loc1 = "Light Engine";
        newMech.zones.ltorso.loc2 = "Light Engine";
      }

      reactor.reactorType = newReactorType;

      return newMech;
    },
    addJumpJets(state, action) {
      let newMech = deepCopy(state);
      if (newMech.movement.jumping > 0) {
        newMech = mechSlice.caseReducers.removeJumpJets(state);
      }
      const numberOfJumpJets = action.payload.numberOfJumpJets;
      const jumpJetType = action.payload.jumpJetType;
      let jumpJetName = "Jump Jet";
      let jumpJetWeight = 1;
      let jumpJetCriticalSlots = 1;
      if (newMech.tonnage < 60) jumpJetWeight = 0.5;
      if (newMech.tonnage > 85) jumpJetWeight = 2;

      if (jumpJetType === "Improved") {
        jumpJetWeight = 2;
        jumpJetCriticalSlots = 2;
        jumpJetName = "Improved Jump Jet";
        if (newMech.tonnage < 60) jumpJetWeight = 1;
        if (newMech.tonnage > 85) jumpJetWeight = 4;
      }

      newMech.movement.jumping = parseInt(numberOfJumpJets);

      for (let i = 0; i < numberOfJumpJets; i++) {
        newMech.equipment.jumpjets = [
          ...newMech.equipment.jumpjets,
          {
            name: jumpJetName,
            id: uuidv4(),
            location: "n/a",
            critical: jumpJetCriticalSlots,
            tons: jumpJetWeight,
            type: jumpJetType,
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
      newMech.movement.jumping = 0;
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
      newMech.criticalSlots +=
        newMech.equipment.heatsinks.length *
        newMech.heatsinks.heatsinkCritSlots;

      newMech.equipment.heatsinks.map((heatsink) => {
        heatsink.slots.map((slot) => {
          newMech.zones[heatsink.location][slot] = "";
        });
      });
      newMech.equipment.heatsinks = [];
      let heatsinkName = "Heatsink";

      newMech.heatsinks.heatsinkCritSlots = 1;
      if (newMech.heatsinks.type === "double") {
        heatsinkName = "Double Heatsink";
        newMech.heatsinks.heatsinkCritSlots = 3;
        if (newMech.technologyBase === "Clan") {
          heatsinkName = "Double Heatsink (C)";
          newMech.heatsinks.heatsinkCritSlots = 2;
        }
      }

      if (newMech.heatsinks.number > internalHeatsinks) {
        for (let i = 0; i < newMech.heatsinks.number - internalHeatsinks; i++) {
          newMech.equipment.heatsinks.push({
            name: heatsinkName,
            type: newMech.heatsinks.type,
            techBase: newMech.technologyBase,
            id: uuidv4(),
            location: "n/a",
            critical: newMech.heatsinks.heatsinkCritSlots,
            tons: 1,
            slots: [],
          });
        }
      }
      newMech.criticalSlots -=
        newMech.equipment.heatsinks.length *
        newMech.heatsinks.heatsinkCritSlots;
      return newMech;
    },
    removeHeatsinks(state) {
      let newMech = deepCopy(state);
      const heatSinksToRemove = newMech.heatsinks.number - 10;

      newMech.heatsinks.number = newMech.heatsinks.number - heatSinksToRemove;
      newMech.remainingTons = newMech.remainingTons + heatSinksToRemove;
      return newMech;
    },
    setHeatsinkType(state, action) {
      let newMech = deepCopy(state);
      newMech.heatsinks.type = action.payload;
      newMech = mechSlice.caseReducers.internalHeatsinks(newMech);
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
        zone == "rlleg" ||
        zone == "frlleg" ||
        zone == "rrlleg"
      ) {
        isPairedZone = true;
      }

      if (
        newMech.armor.unassignedPoints < 1 ||
        (isPairedZone && newMech.armor.unassignedPoints < 2)
      ) {
        if (armorPointsToBeAdded > newMech.armor.armorValue[zone]) {
          return newMech;
        }
      }
      if (newMech.armor.armorValue[zone] > 0) {
        newMech.armor.unassignedPoints += newMech.armor.armorValue[zone];
        if (isPairedZone) {
          newMech.armor.unassignedPoints += newMech.armor.armorValue[zone];
        }
        newMech.armor.armorValue[zone] = 0;
      }
      newMech.armor.armorValue[zone] = armorPointsToBeAdded;

      newMech.armor.unassignedPoints -= armorPointsToBeAdded;
      if (isPairedZone) {
        newMech.armor.unassignedPoints -= armorPointsToBeAdded;
      }

      return newMech;
    },
    addArmor(state, action) {
      let newMech = deepCopy(state);

      if (newMech.armor.armorWeight > 0) {
        newMech.remainingTons += newMech.armor.armorWeight;
        newMech.armor.armorWeight = 0;
      }

      newMech.armor.armorFactor = Number(action.payload);

      //newMech.armor.armorType = "Standard";
      const armorFactorUnmodified = Math.round(
        newMech.armor.armorFactor / newMech.armor.armorBasePointsMultiplier
      );
      newMech.armor.armorWeight = Math.ceil(armorFactorUnmodified / 8) * 0.5;

      newMech = mechSlice.caseReducers.stripArmor(newMech);
      newMech.remainingTons -= newMech.armor.armorWeight;

      return newMech;
    },
    setArmorType(state, action) {
      let newMech = deepCopy(state);
      const oldArmor = { ...newMech.armor };
      newMech = mechSlice.caseReducers.removeAllArmorSlots(newMech);
      const techBase = newMech.technologyBase;

      newMech.remainingTons += oldArmor.armorWeight;
      newMech.criticalSlots += oldArmor.armorSlots;
      newMech.armor.armorType = action.payload;

      newMech.armor.armorWeight = 0;
      newMech.armor.armorFactor = 0;

      if (newMech.armor.armorType === "Standard") {
        newMech.armor.armorBasePointsMultiplier = 1;
        newMech.armor.armorSlots = 0;
      }
      if (
        newMech.armor.armorType === "Ferro-Fibrous" &&
        techBase === "Inner Sphere"
      ) {
        newMech.armor.armorBasePointsMultiplier = 1.12;
        newMech.armor.armorSlots = 14;
      }
      if (newMech.armor.armorType === "Ferro-Fibrous" && techBase === "Clan") {
        newMech.armor.armorBasePointsMultiplier = 1.2;
        newMech.armor.armorSlots = 7;
      }
      if (newMech.armor.armorType === "Heavy Ferro-Fibrous") {
        newMech.armor.armorBasePointsMultiplier = 1.24;
        newMech.armor.armorSlots = 21;
      }
      if (newMech.armor.armorType === "Light Ferro-Fibrous") {
        newMech.armor.armorBasePointsMultiplier = 1.06;
        newMech.armor.armorSlots = 7;
      }
      if (newMech.armor.armorType === "Stealth Armor") {
        newMech.armor.armorBasePointsMultiplier = 1;
        newMech.armor.armorSlots = 12;

        const checkIfECMInstalled = () => {
          return newMech.equipment.gear.some((item) =>
            item.name.includes("ECM")
          );
        };
        if (!checkIfECMInstalled()) {
          newMech.equipment.gear.push({
            id: uuidv4(),
            category: "Special Equipment",
            type: "gear",
            name: "Guardian ECM",
            heat: 0,
            damage: "n/a",
            minimal: "-",
            range: "n/a",
            ammo: "-",
            tons: 1.5,
            critical: 2,
            location: "n/a",
            slots: [],
          });
        }
        newMech.remainingTons -= 1.5; //weight of ECM
        newMech.criticalSlots -= 14; //2 for ECM, 12 from Stealth Armor
        for (const [zoneName, zones] of Object.entries(newMech.zones)) {
          if (zoneName !== "head") {
            let zoneLength = Object.keys(zones).length;

            let stealthArmorSlot1 = "loc" + Number(zoneLength - 1);
            let stealthArmorSlot2 = "loc" + Number(zoneLength);
            zones[stealthArmorSlot1] = "Stealth Armor";
            zones[stealthArmorSlot2] = "Stealth Armor";
          }
        }
      }
      newMech.criticalSlots -= newMech.armor.armorSlots;
      return newMech;
    },
    removeAllArmorSlots(state) {
      let newMech = deepCopy(state);
      for (const [zoneName, slots] of Object.entries(newMech.zones)) {
        const slotEntries = Object.values(slots);
        slotEntries.map((entry, index) => {
          if (entry.includes(newMech.armor.armorType)) {
            let slot = "loc" + Number(index + 1);
            newMech.zones[zoneName][slot] = "";
          }
        });
      }
      return newMech;
    },
    autoArmorDistribution(state) {
      let newMech = deepCopy(state);

      let armorPoints = newMech.armor.armorFactor;
      const intern = newMech.armor.internal;

      const ctFront = Math.ceil((intern.ctorso * 2 * 3) / 4);
      const ctRear = intern.ctorso * 2 - ctFront;
      const rltFront = Math.ceil((intern.rltorso * 2 * 3) / 4);
      const rltRear = intern.rltorso * 2 - rltFront;

      const maxArmor = {
        head: 9,
        ctorso: ctFront,
        ctrear: ctRear,
        rltorso: rltFront,
        rltrear: rltRear,
        rlarm: intern.rlarm * 2,
        rlleg: intern.rlleg * 2,
      };

      // console.log(`max armor: ${JSON.stringify(maxArmor)}`);
      // console.log(`armorpoints: ${armorPoints}`);

      const distArmor = distributeArmorPoints(parseInt(armorPoints), maxArmor);
      newMech.armor.unassignedPoints = 0;
      // console.log(`distributed armor: ${JSON.stringify(distArmor)}`);
      newMech.armor.armorValue = distArmor;
      // console.log(
      //   `current armorValue: ${JSON.stringify(newMech.armor.armorValue)}`
      // );

      return newMech;
    },
    stripArmor(state) {
      let newMech = deepCopy(state);
      if (newMech.armor.armorWeight > 0) {
        if (newMech.chassisType === "Bipedal") {
          newMech.armor.armorValue = {
            head: 0,
            ctorso: 0,
            ctrear: 0,
            rltorso: 0,
            rltrear: 0,
            rlarm: 0,
            rlleg: 0,
          };
        } else {
          newMech.armor.armorValue = {
            head: 0,
            ctorso: 0,
            ctrear: 0,
            rltorso: 0,
            rltrear: 0,
            frlleg: 0,
            rrlleg: 0,
          };
        }

        newMech.armor.unassignedPoints = newMech.armor.armorFactor;
      }
      return newMech;
    },
    maxArmor(state, action) {
      let newMech = deepCopy(state);
      const maxArmor = action.payload.tons;
      if (newMech.armor.armorWeight > 0) {
        newMech.remainingTons += newMech.armor.armorWeight;
        newMech.armor.armorWeight = 0;
      }

      newMech.armor.armorWeight = maxArmor;
      newMech.remainingTons -= newMech.armor.armorWeight;
      newMech.armor.unassignedPoints = 0;
      newMech.armor.armorFactor = action.payload.value;

      const ctorsoMax = newMech.armor.internal.ctorso * 2;
      const ctorsoFront = Math.floor(ctorsoMax * 0.75);
      const ctorsoRear = ctorsoMax - ctorsoFront;
      const rltorsoMax = newMech.armor.internal.rltorso * 2;
      const rltorsoFront = Math.floor(rltorsoMax * 0.75);
      const rltorsoRear = rltorsoMax - rltorsoFront;

      if (newMech.chassisType === "Bipedal") {
        newMech.armor.armorValue = {
          head: 9,
          ctorso: ctorsoFront,
          ctrear: ctorsoRear,
          rltorso: rltorsoFront,
          rltrear: rltorsoRear,
          rlarm: newMech.armor.internal.rlarm * 2,
          rlleg: newMech.armor.internal.rlleg * 2,
        };
      } else {
        newMech.armor.armorValue = {
          head: 9,
          ctorso: ctorsoFront,
          ctrear: ctorsoRear,
          rltorso: rltorsoFront,
          rltrear: rltorsoRear,
          frlleg: newMech.armor.internal.frlleg * 2,
          rrlleg: newMech.armor.internal.rrlleg * 2,
        };
      }

      return newMech;
    },
    InstallEquipment(state, action) {
      let newMech = deepCopy(state);
      const equipId = action.payload.id;
      const equipZone = action.payload.zone;
      const equipSlots = [];

      const addEquipmentToZone = (item) => {
        const slots = item.critical;

        //WIP: changing multine item display names
        const itemDisplayName = (item) => {
          let displayName = "";
          if (item.slots.length < 2) return item.name;
        };

        const zoneValues = Object.values(newMech.zones[equipZone]);
        const index = zoneValues.findIndex((loc) => {
          return loc === "";
        });
        for (let i = 0; i < slots; i++) {
          if (!zoneValues[index + i] === "") {
            //implementation needed!
            console.log("Component doesn't fit");
            return state;
          }
        }
        for (let i = 0; i < slots; i++) {
          let locNumber = Number(index + 1 + i);
          let location = `loc` + locNumber;

          item.slots.push(location);
          equipSlots.push(location);
          newMech.zones[equipZone][location] = item.name;
          if (item.name.includes("Artemis") && i === slots - 1) {
            const missileName = item.name.split(" + ")[0];
            newMech.zones[equipZone][location] =
              "Artemis IV (" + missileName + ")";
          }
        }
      };

      // change location for the equipment
      for (const [equipmentType, equipments] of Object.entries(
        newMech.equipment
      )) {
        equipments.forEach((equip, index) => {
          if (equipId === equip.id) {
            addEquipmentToZone(newMech.equipment[equipmentType][index]);
            newMech.equipment[equipmentType][index].location = equipZone;
          }
        });
      }

      // uninstall pushed out items
      let unInstallItem = false;
      for (const [_, equipments] of Object.entries(newMech.equipment)) {
        equipments.forEach((item) => {
          if (item.location === equipZone) {
            item.slots.forEach((loc) => {
              equipSlots.forEach((equipSlot) => {
                if (loc === equipSlot && item.id !== equipId) {
                  unInstallItem = true;
                }
              });
            });
          }
          if ("splitZones" in item && item.splitZones[1] === equipZone) {
            if ("splitZoneSlots" in item) {
              item.splitZoneSlots.map((loc) => {
                equipSlots.forEach((equipSlot) => {
                  if (loc === equipSlot && item.id !== equipId)
                    unInstallItem = true;
                });
              });
            }
          }
          if (unInstallItem) {
            item.slots = [];
            item.location = "n/a";
            if ("splitZones" in item) {
              delete item.splitZones;
            }
            if ("splitZoneSlots" in item) {
              delete item.splitZoneSlots;
            }
            unInstallItem = false;
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
            //total removal of item:
            // newMech.equipment[equipmentType] = equipments.filter(
            //   (item) => item.id !== unInstallEquipmentId
            // );

            item.slots.map((slot) => {
              newMech.zones[item.location][slot] = "";
            });
            item.location = "n/a";
            if ("splitZones" in item) {
              delete item.splitZones;
            }
            if ("splitZoneSlots" in item) {
              delete item.splitZoneSlots;
            }
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

      // const eligibleForTargetingComputer = ["DE", "DB", "P"];
      const checkForTargetingComputer = newMech.equipment.gear.find(
        (gearItem) => (gearItem.name = "Targeting Computer")
      );
      if (checkForTargetingComputer) {
        newMech =
          mechSlice.caseReducers.setTargetingComputerWeightAndSlots(newMech);
      }

      if (!isNaN(Number(weapon.ammo))) {
        const newAmmo = {
          id: uuidv4(),
          name: "Ammo (" + weapon.name + ") " + weapon.ammo,
          ammoFor: weapon.name,
          tons: 1,
          critical: 1,
          location: "n/a",
          slots: [],
        };
        if (newAmmo.ammoFor === "MG") {
          newAmmo.tons = 0.5;
          newAmmo.name = "Ammo (MG) 100";
        }

        const checkForExistingAmmo = newMech.equipment.ammo.findIndex(
          (ammo) => ammo.name === newAmmo.name
        );
        if (checkForExistingAmmo === -1) {
          newMech.equipment.ammo.push(newAmmo);
          newMech.remainingTons -= newAmmo.tons;
          newMech.criticalSlots -= newAmmo.critical;
        }
      }

      return newMech;
    },
    addSplitZoneWeapon(state, action) {
      let newMech = deepCopy(state);
      const weaponId = action.payload.id;
      const zones = action.payload.zones.split("/");

      let weapon = newMech.equipment.weapons.find(
        (weapon) => weapon.id === weaponId
      );
      weapon.splitZones = zones;

      return newMech;
    },
    installSplitZoneWeapon(state, action) {
      let newMech = deepCopy(state);
      let weapon = action.payload.weapon;
      const slotsZoneA = action.payload.slotsZoneA;
      const slotsZoneB = action.payload.slotsZoneB;
      const equipSlotsA = [];
      const equipSlotsB = [];

      const addEquipmentToZone = (
        item,
        slotsPerZone,
        equipSlots,
        equipZone
      ) => {
        let itemSlots = [];
        const slots = slotsPerZone;
        const zoneValues = Object.values(newMech.zones[equipZone]);
        const index = zoneValues.findIndex((loc) => {
          return loc === "";
        });
        for (let i = 0; i < slots; i++) {
          if (!zoneValues[index + i] === "") {
            //implementation needed!
            console.log("Component doesn't fit");
            return state;
          }
        }
        for (let i = 0; i < slots; i++) {
          let locNumber = Number(index + 1 + i);
          let location = `loc` + locNumber;

          itemSlots.push(location);
          equipSlots.push(location);
          newMech.zones[equipZone][location] = item.name;
        }
        return itemSlots;
      };

      for (const [equipmentType, equipments] of Object.entries(
        newMech.equipment
      )) {
        equipments.map((equip, index) => {
          if (weapon.id === equip.id) {
            newMech.equipment[equipmentType][index] = {
              ...newMech.equipment[equipmentType][index],
              slots: addEquipmentToZone(
                weapon,
                slotsZoneA,
                equipSlotsA,
                weapon.splitZones[0]
              ),
              splitZoneSlots: addEquipmentToZone(
                weapon,
                slotsZoneB,
                equipSlotsB,
                weapon.splitZones[1]
              ),
              location: weapon.splitZones[0],
            };
          }
        });
      }

      // uninstall pushed out items
      let unInstallItem = false;
      for (const [_, equipments] of Object.entries(newMech.equipment)) {
        equipments.map((item) => {
          if (item.location === weapon.splitZones[0]) {
            item.slots.map((loc) => {
              equipSlotsA.map((equipSlot) => {
                if (loc === equipSlot && item.id !== weapon.id) {
                  unInstallItem = true;
                }
              });
            });
          }
          if (item.location === weapon.splitZones[1]) {
            item.slots.map((loc) => {
              equipSlotsB.map((equipSlot) => {
                if (loc === equipSlot && item.id !== weapon.id) {
                  unInstallItem = true;
                }
              });
            });
          }
          if (unInstallItem) {
            item.slots = [];
            item.location = "n/a";
            if ("splitZones" in item) {
              delete item.splitZones;
            }
            if ("splitZoneSlots" in item) {
              delete item.splitZoneSlots;
            }
            unInstallItem = false;
          }
        });
      }

      return newMech;
    },
    addGear(state, action) {
      let newMech = deepCopy(state);
      let newGear = { ...action.payload };

      newGear.id = uuidv4();
      newGear.location = "n/a";
      newGear.slots = [];

      newMech.remainingTons -= newGear.tons;
      newMech.criticalSlots -= newGear.critical;
      newMech.equipment.gear.push(newGear);
      if (newGear.name === "Targeting Computer") {
        newMech =
          mechSlice.caseReducers.setTargetingComputerWeightAndSlots(newMech);
      }

      return newMech;
    },
    removeEquipment(state, action) {
      let newMech = deepCopy(state);
      const equip = action.payload;

      const weapons = newMech.equipment.weapons.filter(
        (item) => item.id !== equip.id
      );

      const ammo = newMech.equipment.ammo.filter(
        (item) => item.id !== equip.id
      );
      const gear = newMech.equipment.gear.filter(
        (item) => item.id !== equip.id
      );

      newMech.equipment.weapons = weapons;
      newMech.equipment.ammo = ammo;
      newMech.equipment.gear = gear;

      const checkForTargetingComputer = newMech.equipment.gear.find(
        (gearItem) => gearItem.name === "Targeting Computer"
      );
      if (checkForTargetingComputer) {
        newMech =
          mechSlice.caseReducers.setTargetingComputerWeightAndSlots(newMech);
      }

      newMech.remainingTons += equip.tons;
      newMech.criticalSlots += equip.critical;

      return newMech;
    },
    setArmActuators(state, action) {
      let newMech = deepCopy(state);
      const arm = action.payload.arm;
      const actuator = action.payload.actuator;

      if (actuator === "Hand Actuator") {
        if (newMech.zones[arm].loc4 !== "Hand Actuator") {
          newMech.zones[arm].loc4 = "Hand Actuator";
          if (newMech.zones[arm].loc3 !== "Lower Arm Actuator") {
            newMech.zones[arm].loc3 = "Lower Arm Actuator";
            newMech.criticalSlots -= 1;
          }
          newMech.criticalSlots -= 1;
        } else {
          newMech.zones[arm].loc4 = "";
          newMech.criticalSlots += 1;
        }
      }
      if (actuator === "Lower Arm Actuator") {
        if (newMech.zones[arm].loc3 !== "Lower Arm Actuator") {
          newMech.zones[arm].loc3 = "Lower Arm Actuator";
          newMech.criticalSlots -= 1;
        } else {
          newMech.zones[arm].loc3 = "";
          newMech.zones[arm].loc4 = "";
          newMech.criticalSlots += 2;
        }
      }

      return newMech;
    },
    addAmmo(state, action) {
      let newMech = deepCopy(state);
      const weapon = action.payload;

      const newAmmo = {
        id: uuidv4(),
        name: "Ammo (" + weapon.name + ") " + weapon.ammo,
        ammoFor: weapon.name,
        tons: 1,
        critical: 1,
        location: "n/a",
        slots: [],
      };

      if (newAmmo.ammoFor === "MG") {
        const existingMGAmmo = newMech.equipment.ammo.find(
          ({ tons }) => tons === 0.5
        );
        if (existingMGAmmo) {
          existingMGAmmo.tons = 1;
          existingMGAmmo.name = "Ammo (MG) 200";
          newMech.remainingTons -= 0.5;
          newMech.criticalSlots -= newAmmo.critical;

          return newMech;
        } else {
          newAmmo.tons = 0.5;
          newAmmo.name = "Ammo (MG) 100";
        }
      }
      newMech.equipment.ammo.push(newAmmo);

      newMech.remainingTons -= newAmmo.tons;
      newMech.criticalSlots -= newAmmo.critical;

      return newMech;
    },
    removeAmmo(state, action) {
      let newMech = deepCopy(state);
      const weapon = action.payload;

      const ammoToBeRemoved = newMech.equipment.ammo.find(
        (ammo) => ammo.ammoFor === weapon.name
      );

      if (ammoToBeRemoved.ammoFor === "MG") {
        if (ammoToBeRemoved.tons === 1) {
          ammoToBeRemoved.name = "Ammo (MG) 100";
          ammoToBeRemoved.tons = 0.5;
          newMech.remainingTons += 0.5;
          return newMech;
        }
      }

      newMech.remainingTons += ammoToBeRemoved.tons;
      newMech.criticalSlots += ammoToBeRemoved.critical;

      const newAmmo = newMech.equipment.ammo.filter(
        (ammo) => ammo.id !== ammoToBeRemoved.id
      );

      newMech.equipment.ammo = newAmmo;

      return newMech;
    },

    unInstallEquipFromZone(state, action) {
      let newMech = deepCopy(state);
      const zonesForRemoval = action.payload.zones;
      const locsForRemoval = action.payload.slots;

      zonesForRemoval.forEach((zoneForRemoval) => {
        for (const [loc, entry] of Object.entries(
          newMech.zones[zoneForRemoval]
        )) {
          if (entry !== "" && locsForRemoval.includes(loc)) {
            for (const [_, categoryEntries] of Object.entries(
              newMech.equipment
            )) {
              categoryEntries.forEach((item) => {
                if (
                  item.location === zoneForRemoval &&
                  item.slots.includes(loc)
                ) {
                  item.slots.forEach((itemSlot) => {
                    newMech.zones[zoneForRemoval][itemSlot] = "";
                  });
                }
                if (
                  "splitZones" in item &&
                  item.splitZones[1] === zoneForRemoval
                ) {
                  if ("splitZoneSlots" in item)
                    item.splitZoneSlots.forEach((splitZoneSlot) => {
                      newMech.zones[item.splitZones[1]][splitZoneSlot] = "";
                    });

                  item.slots.forEach((itemSlot) => {
                    newMech.zones[item.location][itemSlot] = "";
                  });
                }
                item.location = "n/a";
                item.slots = [];
                if ("splitZones" in item) {
                  delete item.splitZones;
                }
                if ("splitZoneSlots" in item) {
                  delete item.splitZoneSlots;
                }
              });
            }
          }
        }
      });

      return newMech;
    },
    installEndoSteel(state) {
      //can be removed once FinalActions is reworked
      let newMech = deepCopy(state);
      let endoSteelSlots = 7;
      if (newMech.technologyBase === "Inner Sphere") endoSteelSlots += 7;
      let endoSteelCounter = 0;

      while (endoSteelCounter < endoSteelSlots) {
        outerLoop: for (const [zone, locs] of Object.entries(newMech.zones)) {
          for (let i = 0; i < Object.keys(locs).length; i++) {
            let counter = i + 1;
            let location = "loc" + counter;

            if (newMech.zones[zone][location] === "") {
              newMech.zones[zone][location] = "ReRoll: Endo Steel";
              endoSteelCounter++;
              break outerLoop;
            }
          }
        }
      }

      return newMech;
    },

    installReRollSlots(state, action) {
      let newMech = deepCopy(state);
      const reRollName = "ReRoll: " + action.payload.name;
      let reRollSlots = action.payload.slots;

      for (const [zone, locs] of Object.entries(newMech.zones)) {
        if (reRollSlots <= 0) break;
        for (const [locName, entry] of Object.entries(locs)) {
          if (reRollSlots <= 0) break;
          if (!entry) {
            newMech.zones[zone][locName] = reRollName;
            reRollSlots--;
          }
        }
      }

      if (reRollSlots > 0) return state;

      return newMech;
    },
    setTargetingComputerWeightAndSlots(state) {
      let newMech = deepCopy(state);

      let tc = newMech.equipment.gear.find(
        (gear) => gear.name === "Targeting Computer"
      );
      if (tc !== undefined) {
        newMech.remainingTons += tc.tons;
        newMech.criticalSlots += tc.critical;

        let directFireWeaponWeight = 0;
        const eligibleForTargetingComputer = ["DE", "DB", "P"];
        newMech.equipment.weapons.map((item) => {
          if (
            item.type.some(
              (weaponType) =>
                eligibleForTargetingComputer.includes(weaponType) &&
                !item.name.includes("Machine Gun")
            )
          ) {
            directFireWeaponWeight += item.tons;
          }
        });

        let newWeight = 0;
        if (newMech.technologyBase === "Clan") {
          newWeight = Math.ceil(directFireWeaponWeight / 5);
        } else {
          newWeight = Math.ceil(directFireWeaponWeight / 4);
        }
        if (newWeight < 1) newWeight = 1;
        if (newWeight !== tc.tons) {
          if (tc.location !== "n/a") {
            tc.slots.map((tcSlot) => {
              newMech.zones[tc.location][tcSlot] = "";
            });
            tc.location = "n/a";
            tc.slots = [];
          }
        }

        tc.tons = newWeight;
        tc.critical = newWeight;
        newMech.remainingTons -= tc.tons;
        newMech.criticalSlots -= tc.critical;
      } else {
        return state;
      }

      return newMech;
    },
    setAlphaStrikeData(state) {
      let newMech = deepCopy(state);

      let asData = newMech.alphaStrikeData;

      asData.movement = newMech.movement.walking * 2;
      if (newMech.movement.jumping > 0) asData.movement += "j";
      asData.size = 1;
      if (newMech.tonnage > 39) asData.size += 1;
      if (newMech.tonnage > 59) asData.size += 1;
      if (newMech.tonnage > 79) asData.size += 1;

      asData.armor = Math.round(newMech.armor.armorFactor / 30);
      const structureIndex = newMech.tonnage / 5 - 3;
      asData.structure =
        structureTable[newMech.reactor.reactorType][structureIndex];
      if (newMech.technologyBase === "Clan") {
        asData.structure =
          structureClan[newMech.reactor.reactorType][structureIndex];
      }

      let totalAlphaStrikeDamage = [0, 0, 0, 0];
      let totalHeatOutput = 0;
      let totalHeatOutputLongRange = 0;

      newMech.equipment.weapons.forEach((weapon) => {
        let ammoMultiplier = 1;
        totalHeatOutput += weapon.heat;

        if (weapon.alphaStrikeDamage[2] > 0) {
          totalHeatOutputLongRange += weapon.heat;
        }

        if (weapon.ammo !== "-") {
          const ammoTons = newMech.equipment.ammo.filter(
            (ammo) => ammo.ammoFor === weapon.name
          ).length;
          const ammoTotal = ammoTons * weapon.ammo;
          const isUltra = weapon.name.includes("Ultra");
          const isRotary = weapon.name.includes("Rotary");

          const needsMoreAmmo =
            ammoTotal < 10 ||
            (isUltra && ammoTotal < 20) ||
            (isRotary && ammoTotal < 60);

          if (needsMoreAmmo) {
            ammoMultiplier = 0.75;
          }
        }
        weapon.alphaStrikeDamage.forEach((value, i) => {
          totalAlphaStrikeDamage[i] += value * ammoMultiplier;
        });
      });
      const roundedAlphaStrikeDamage = totalAlphaStrikeDamage.map((d) =>
        Math.round(d)
      );

      totalHeatOutput += 2;
      if (newMech.movement.jumping) {
        totalHeatOutput += 1;
        if (newMech.movement.jumping > 3) {
          totalHeatOutput += newMech.movement.jumping - 3;
        }
      }

      asData.damage = roundedAlphaStrikeDamage;

      return newMech;
    },

    resetMechToInitialState() {
      let newMech = deepCopy(initialMechState);
      return newMech;
    },
  },
});

export const mechActions = mechSlice.actions;
export default mechSlice;
