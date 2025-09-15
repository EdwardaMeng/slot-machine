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

src/
├─ main.ts # Entry point, initializes the application
├─ SlotMachineApp.ts # Main game class managing reels, spin, and winText
├─ ReelsContainer.ts # Reel container class for generating and updating reels
├─ Paylines.ts # Payline and payout calculation logic
├─ WinText.ts # Handles displaying winning information
├─ assets/ # Symbol and button images
└─ index.html # HTML entry with canvas container

bash

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
Install dependencies:

npm install
Start the development server:

npm run dev
```
Usage
Open the game in the browser.

Click the Spin button to randomly spin the reels.

Watch the win text update with the current positions and visible screenSymbols.

Check total wins and payline details in the win display.

Notes
Built with Pixi.js for rendering.

Fully modular with classes for scalability.

Positions and symbols are accessible for future analytics or features.

