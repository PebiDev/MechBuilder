# This is The Mechbuilder - a REACT Project for designing Battlemech for the "Classic Battletech" Tabletop Game

This project was done as a demo for React along with Redux Toolkit.

"Battletech" is a gaming franchise based on a tabletop game pitching futuristic warmachines called Battlemechs against each other. The franchise consists of the famous "Mechwarrior" PC game adaptations, dozens of sourcebooks, over one hundred novels and several hundreds of different miniatures for the game itself.

With the Mechbuilder you can design a Battlemech for yourself. You determine its weightclass, its speed, armor and weapons and other gear.

Battlemechs are being constructed by a specific ruleset that is used for this Battlemech builder. While the original rules have been around since the games first release in 1984, they have been expanded more recently with the "Tech Manual" released in 2007. This Mechbuilder both uses the base rules as well as the expanded rules as "Advanced Options".

# Motivation

While learning react and especially redux I wanted to make an app that makes use of the concept. The mechbuilder uses a quite complex state for all the users design choices. It follows the "lean component, fat reducer" concept, where almost all logic is handled by the reducers itself.
The biggest challenge was to make the building process fluid. Only the initial choices of the technologybase, chassistype and weight class reset the builder. While the user can experiment with speed, armor and equipment as much as they want.

# Mechbuilding Basics

If you are not familiar with "Battletech" here is a primer. Battlemechs are giant machines up to 12 meters tall and weighing between 20 and 100 tons. More weight allows for more armor and weapons but at the cost of speed.
