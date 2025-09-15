# Slot Machine Game

A **TypeScript** and **Pixi.js** based slot machine game, featuring randomly generated reel symbols, payline calculations, and real-time win display.

## Features

- 5 columns × 3 rows slot reels
- Randomly generated reel symbols
- Multiple paylines (7 example paylines)
- Paytable supports different payouts for different symbols
- Spin button to control the reels
- Real-time update of `positions` and visible `screenSymbols`
- Display total wins and detailed payline results
- Fully object-oriented and modular with TypeScript

## Project Structure
slot-machine/ # Project root
main.ts # Entry point, initializes the application
SlotMachineApp.ts # Main game class: manages reels, spin, and winText
Reel.ts # Reel class for generating single reel
ReelsContainer.ts # Reel container class for generating and updating reels
Paylines.ts # Payline definitions and payout calculation logic
WinText.ts # Handles displaying winning info on screen
assets # Images and symbols used in the game

## Installation

1. Clone the repository:
```
git clone <repository-url>

npm install

npm run dev
```
Usage
Open the game in the browser.

Click the Spin button to randomly spin the reels.

Watch the win text update with the current positions and visible screenSymbols.

Check total wins and payline details in the win text display.




