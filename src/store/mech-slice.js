import { createSlice } from "@reduxjs/toolkit";
import internalStructure from "../data/internalStructure";
import reactorValues from "../data/reactorValues";
import { v4 as uuidv4 } from "uuid";

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
  movement: { walking: 0, running: 0, jumping: 0 },

  gyro: { type: "standard", weight: 0 },
  heatsinks: { type: "standard", heatsinkCritSlots: 1, number: 10 },
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
  zones: zonesBiped,
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

      //newMech = mechSlice.caseReducers.resetMechToInitialState();
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
      newMech.gyro.type = "standard";
      const gyroWeight = Math.ceil(
        parseInt(newMech.reactor.reactorValue) / 100
      );
      newMech.gyro.weight = gyroWeight;
      newMech.remainingTons = newMech.remainingTons - gyroWeight;
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

      newMech.armor.internal = internalStructure.find(
        (e) => e.tonnage == newMech.tonnage
      );

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
      newMech.criticalSlots =
        newMech.criticalSlots -
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
      const equipSlots = [];

      const addEquipmentToZone = (item) => {
        const slots = item.critical;

        const zoneValues = Object.values(newMech.zones[equipZone]);
        const index = zoneValues.findIndex((loc) => {
          return loc === "";
        });
        for (let i = 0; i < slots; i++) {
          if (!zoneValues[index + i] === "") {
            //implementation needed!
            console.log("Component doesn't fit");
            return;
          }
        }
        for (let i = 0; i < slots; i++) {
          let locNumber = Number(index + 1 + i);
          let location = `loc` + locNumber;

          item.slots.push(location);
          equipSlots.push(location);
          newMech.zones[equipZone][location] = item.name;
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

      // uninstall pushed out items
      for (const [equipemntType, equipments] of Object.entries(
        newMech.equipment
      )) {
        equipments.map((item) => {
          item.slots.map((loc) => {
            equipSlots.map((equipSlot) => {
              if (loc === equipSlot && item.id !== equipId) {
                item.slots = [];
                item.location = "n/a";
              }
            });
          });
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
      if (weapon.ammo !== "-") {
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

      newMech.remainingTons += equip.tons;
      newMech.criticalSlots += equip.critical;

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
    unInstallAllFromCTorso(state) {
      let newMech = deepCopy(state);

      const ctorso = newMech.zones.ctorso;

      for (const [slot, entry] of Object.entries(ctorso)) {
        if (entry !== "") {
          newMech.equipment.weapons.map((weapon) => {
            if (weapon.location === "ctorso") {
              weapon.slots.map((weaponSlot) => {
                if (weaponSlot === slot) {
                  ctorso[weaponSlot] = "";
                  weapon.location = "n/a";
                  weapon.slots = [];
                }
              });
            }
          });
        }
      }

      return newMech;
    },
    unInstallEquipFromZone(state, action) {
      let newMech = deepCopy(state);
      console.log(action.payload);
      const zonesForRemoval = action.payload.zones;
      const locsForRemoval = action.payload.slots;

      zonesForRemoval.map((zoneForRemoval) => {
        for (const [loc, entry] of Object.entries(
          newMech.zones[zoneForRemoval]
        )) {
          if (entry !== "" && locsForRemoval.includes(loc)) {
            for (const [equipCategory, categoryEntries] of Object.entries(
              newMech.equipment
            )) {
              categoryEntries.map((item) => {
                if (
                  item.location === zoneForRemoval &&
                  item.slots.includes(loc)
                ) {
                  item.slots.map((itemSlot) => {
                    newMech.zones[zoneForRemoval][itemSlot] = "";
                  });
                  item.location = "n/a";
                  item.slots = [];
                }
              });
            }
          }
        }
      });

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
