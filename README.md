# This is The Mechbuilder - a REACT Project for designing Battlemech for the _Classic Battletech_ Tabletop Game

This project was created as a demo for using React along with Redux Toolkit.

_BattleTech_ is a gaming franchise based on a tabletop game that pits futuristic war machines, called BattleMechs, against each other. The franchise includes the famous _MechWarrior_ PC game series, dozens of sourcebooks, over a hundred novels, and hundreds of miniature models for tabletop play.

With the Mechbuilder, you can design your own custom BattleMech. You decide its weight class, speed, armor, weapons, and other equipment.

BattleMechs are built according to a specific ruleset, which this builder follows. The original rules have been around since the game's first release in 1984 and were later expanded in the _TechManual (2007)_. This builder supports both the core rules and the expanded rules as "Advanced Options."

# Motivation

While learning React — and especially Redux — I wanted to build an app that makes use of these concepts in a meaningful way. The Mechbuilder manages a fairly complex state for all of the user’s design decisions. It follows a “lean component, fat reducer” approach, where most of the logic is handled within the reducers themselves.

The biggest challenge was making the building process feel fluid. Only the initial choices — technology base, chassis type, and weight class — reset the builder. After that, users can freely experiment with speed, armor, and equipment without losing progress.

# Mechbuilding Basics

If you're unfamiliar with BattleTech, here’s a quick primer:
BattleMechs are giant combat machines up to 12 meters tall and weighing between 20 and 100 tons. More weight allows for heavier armor and more powerful weapons — but at the cost of speed.

# Open Tasks

- Save: Implementation of "Save" to localStorage
- Print : Implementation of a "Print" function
- Alpha Strike : Implementation of Alpha Strike Stats. This is frustrating! As of 26.5.25 the Errata for the "Alpha Strike Heat Conversion" is offline on the official Site and I cannot find it anywhere on the web. The previous section of the rules regarding Heat Conversation is a mess (which is clearly why they made an errata in the first place). Until I can find the correct rules the heat conversion remains unfinished. This currently includes DisplayAlphaStrike component.
- Weapons: OneShot Launchers are among the few official Battletech rules that I find superflous. Therefore they are currently not included in the Mechbuilder. I should add at them at some point.
- Advanced Tactical Rules: There are a ton of weapons and equipment available in the "Tactical Handbook". At some point those should be included as well.
- Existing Mechs: Explore options to tap into the MUL (Master Unil List, which is officially available and lists stats of all existing Battlemechs)
- Tech Eras: Currently the Equipment available is from the IlClan Era. I would like to give every item an Era in which it is available and include the option for Users to choose an Era. Eras would be: Star League, Succession Wars, Clan Invasion, Fedcom Civil War, Jihad, Dark Age and IlClan.
- Weapons: Display some Analysis for the Weaponsloadout of a Mech, a heat profile, an Alpha Strike option (not to be confused with the Alpha Strike System. Alpha Strike means firing all Weapons in one attack).
- Solaris VII: The Solaris VII duel system is old and the current designers are not happy with it. We may see an overhaul in the future but for now, I dont think I will include a conversion to duel rules in the Mechbuilder.
