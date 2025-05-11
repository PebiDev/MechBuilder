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
    hardened: "Hardened armor is twice as strong per point but weighs double.",
  },
} satisfies Record<string, Record<string, TooltipEntry>>;
