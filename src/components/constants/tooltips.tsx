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
  heatsinks: {
    standard: (
      <span>
        <Highlight>Standard Heatsinks</Highlight> remove one heat and cost{" "}
        <Highlight>one ton </Highlight> and take up{" "}
        <Highlight>one critical slot</Highlight>.
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
} satisfies Record<string, Record<string, TooltipEntry>>;
