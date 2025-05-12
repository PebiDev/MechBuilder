import { ReactNode } from "react";
import { styled } from "@mui/material/styles";
type TooltipEntry =
  | string
  | ReactNode
  | ((...args: any[]) => string | ReactNode);

const Highlight = styled("span")({
  color: "#ffa726",
  fontWeight: "bold",
});

export const tooltips = {
  internalStructure: {
    standard: (
      <span>
        Internal Structure costs <Highlight>10% </Highlight> of the Mechs total
        weight.
      </span>
    ),
    endoSteel: (slots: number) => (
      <span>
        Endo Steel costs only half of the internal Structure but takes up{" "}
        <Highlight>{slots} </Highlight>critical slots.
      </span>
    ),
  },
  chassisType: {
    bipedal: (
      <span>
        Almost all Battlemechs are <Highlight>bipedal</Highlight>.
      </span>
    ),
    quad: (
      <span>
        Four-legged Battlemechs are rare, have{" "}
        <Highlight>fewer space </Highlight>
        for equipment but have some unique
        <Highlight> advantages</Highlight>.
      </span>
    ),
  },

  techBase: {
    innerSphere: (
      <span>
        BattleMechs used by the <Highlight>Successor Houses</Highlight> and the
        Periphery.
      </span>
    ),
    clan: (
      <span>
        The <Highlight>Clans</Highlight> have developed superior technology and
        use advanced components.
      </span>
    ),
  },
  cockpit: {
    standard: (
      <span>
        Every Mech requires a <Highlight>Cockpit </Highlight>for the
        Mechwarrior.
      </span>
    ),
    small: (
      <span>
        The <Highlight>Small Cockpit </Highlight>saves one ton of weight and
        opens up an additional <Highlight>critical slot </Highlight>in the head,
        but increases all Piloting roll difficulties by one due to the limited
        space in the crammed cockpit.
      </span>
    ),
  },
  movement: (
    <span>
      Movement determines how far your Mech can travel.{" "}
      <Highlight>Walking speed</Highlight> is the baseline for all movement.
    </span>
  ),
  reactor: {
    standard: (
      <span>
        The <Highlight>standard</Highlight>Fusion Engine powers the Battlemech.
        Its weight is determined by the <Highlight>reactor value </Highlight>
        which in turn is{" "}
        <Highlight>walking speed times the Mechs tonnage.</Highlight>
      </span>
    ),
    xlEngine: (xlSlots: number) => (
      <span>
        The <Highlight>XL Engine</Highlight> weighs only{" "}
        <Highlight>half</Highlight> of the standard reactor but takes up{" "}
        <Highlight>{xlSlots} slots</Highlight> in each side torso.
      </span>
    ),
    compactReactor: (
      <span>
        The <Highlight>Compact Engine</Highlight> weighs only{" "}
        <Highlight>150%</Highlight> of the standard reactor uses only{" "}
        <Highlight>3 slots</Highlight> in the center torso instead of 6 slots.{" "}
      </span>
    ),
    lightEngine: (
      <span>
        The <Highlight>Light Engine</Highlight> weighs only{" "}
        <Highlight>75%</Highlight> of the standard reactor but takes up{" "}
        <Highlight>2 slots</Highlight> in the side torsos.{" "}
      </span>
    ),
  },
  gyro: {
    standard: (
      <span>
        Every Mech needs a<Highlight>a Gyroscope</Highlight> to stay upright.
        Its weight is determined by the reactor value / 100.{" "}
      </span>
    ),
    heavyDuty: (
      <span>
        The <Highlight>heavy Duty</Highlight> Gyro can absorb an additional{" "}
        <Highlight>critical hit</Highlight> but its weight is{" "}
        <Highlight>doubled</Highlight>.
      </span>
    ),
    compactGyro: (
      <span>
        The <Highlight>Compact Gyro</Highlight> weighs{" "}
        <Highlight>1.5</Highlight> of the standard gyro but it only uses{" "}
        <Highlight>2 </Highlight>critical slots.
      </span>
    ),
    extraLight: (
      <span>
        The <Highlight>Extra Light Gyro</Highlight> weighs only{" "}
        <Highlight>half </Highlight>of the standard gyro but uses up{" "}
        <Highlight>2</Highlight> more critical slots in the center torso.
      </span>
    ),
  },
  jumpjets: {
    standardJumpJets: (
      <span>
        <Highlight>Jump Jets</Highlight> allow superior movement. Jump Jet
        weight and slots are determined by the Mechs{" "}
        <Highlight>Tonnage</Highlight> .
      </span>
    ),
    improvedJumpJets: (
      <span>
        <Highlight>Improved Jump Jets</Highlight> allow a Mech jumping movement
        up to its running speed. They weigh <Highlight>twice</Highlight> as much
        as normal jump jets.
      </span>
    ),
  },

  heatsinks: {
    standard: (
      <span>
        <Highlight>Standard Heatsinks</Highlight> remove one heat and cost{" "}
        <Highlight>one ton </Highlight> and take up{" "}
        <Highlight>one critical slot</Highlight>.
      </span>
    ),
    double: (heatsinkSlots: number) => (
      <span>
        <Highlight>Double Heatsinks</Highlight> dissipate twice as much heat but
        take up <Highlight>{heatsinkSlots}</Highlight> critical slots.
      </span>
    ),
  },

  armor: {
    standard: (
      <span>
        Standard Armor grants <Highlight>16 points </Highlight>of armor
        <Highlight> per ton</Highlight>.
      </span>
    ),
    ferroFibrous: (armorMultiplier: number, slots: number) => (
      <span>
        Ferro-Fibrous Armor multiplies the armor value by
        <Highlight> {armorMultiplier}</Highlight> but takes up{" "}
        <Highlight>{slots}</Highlight> critical Slots.
      </span>
    ),
    light: (
      <span>
        Light Ferro-Fibrous Armor multiplies the armor value by
        <Highlight> 1.06</Highlight> but takes up only
        <Highlight> 7</Highlight> critical Slots.
      </span>
    ),
    heavy: (
      <span>
        Heavy Ferro-Fibrous Armor multiplies the armor value by
        <Highlight> 1.24</Highlight> but takes up only
        <Highlight> 21</Highlight> critical Slots.
      </span>
    ),
    stealth: (
      <span>
        Stealth Armor offers no more protection than the standard armor, but
        incurs penalties
        <Highlight> penalties for attackers</Highlight> and generates 10 points
        of heat. It also requires an
        <Highlight> ECM Gear</Highlight> and takes up
        <Highlight> 2 slots in every hitlocation</Highlight>.
      </span>
    ),
  },
} satisfies Record<string, TooltipEntry | Record<string, TooltipEntry>>;
