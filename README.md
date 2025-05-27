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

# Mechbuilding Tutorial

In case you do not know what to do with the Mechbuilder, let us create Battlemech step by step.

1. In order to get a feel for what the Builder is able to do, activate the "Advanced Options".
2. Next you can choose to name your Mech, however you like.
3. As "Technology Base" we will take a Mech from the "Inner Sphere".
4. As "Chassis Type" let us construct a "bipedal" Mech.
5. We will go for Medium Mech, so we "select Mech Tonnage" of 50 Tons.
6. For the "Internal Structure" and the "Cockpit" we choose the "Standard" Options.
7. Next we choose a "Walking Speed" for our Mech. We want to have Medium Brawler so we will take a Movement Speed of 5 here.
8. For the Reactor let us stick to the "Standard" reactor for now.
9. Next up is the Gyro where we will also take the "Standard" Option.
10. Now for the jump Capability. Jumping adds a lot of maneuverability to Mech so let us choose "Standard" with the maximum of "5" Jump jets.
11. For "Heatsinks" let us choose "Double Heatsinks". These have a lot of impact on our Mechs combat performance. Let us add two additional Heatsinks. As 10 Heatsinks come automatically with our reactor, we now have 12 double Heatsinks.
12. Let us to stick to "Standard Armor". Protection is extremely important for most Mechs. We want to design a brawler that has to withstand the thick of close combat so let as choose 160 points (10 tons) of armor. For simplicity lets us click the "Distribute Armor" button which will automatically allocate our armorpoints to the different hit locations.
13. We can now opt to uninstall Actuators in our arms. I recommend leaving the Lower Arm and Hand Actuators where they are.
14. As we have added "Jump Jets" and "Heatsinks" we can now install them by choose a "Location" for every component. I recommend addind the Jump Jets to both legs and the final Jump Jet to the center torso. Also the place the "Double Heatsinks" both in the right torso.
15. As for weapons we want to add some close quarters firepower. Choose "Lasers" and let us "add" two "Medium Laser" to our Mech, by clicking the "Add" button next to it twice. The "Medium Lasers" now appear under "Installing Equipment".
16. Let us still add more Weapons and choose a "Large Laser" next.
17. Finally we want to add some more punch to our Brawler by adding an "SRM 6 + Artemis IV". This a missile launcher that will hurl 6 Short Range Missiles against our opponents. You will notice that the Mechbuilder automatically adds a ton of Ammo to our SRM 6 launcher.
18. All that is left to do is to install our weapons. Put the "Large Laser" in the right Arm, the two "Medium Lasers" in the left Arm and the SRM 6 along with its Ammo in the Right Torso.
19. We have used up all the Remaining Tons for our Battlemech. You are now free to play around with the options. You could free up some tons by switching to an XL Engine. This
