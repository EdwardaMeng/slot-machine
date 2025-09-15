import { Container } from "pixi.js";
import { Reel } from "./Reel";

export class ReelsContainer {
  container: Container;
  reels: Reel[] = [];
  cols: number;
  rows: number;
  reelWidth: number;
  bands: string[][];
  symbolAssets: Record<string, string>;
  //Constructor for reels container
  constructor(
    bands: string[][],
    rows: number,
    cols: number,
    reelWidth: number,
    symbolAssets: Record<string, string>,
  ) {
    this.container = new Container();
    this.rows = rows;
    this.cols = cols;
    this.reelWidth = reelWidth;
    this.bands = bands;
    this.symbolAssets = symbolAssets;

    this.createReels();
  }
  //Method for creating a new reel
  private createReels() {
    for (let i = 0; i < this.cols; i++) {
      const reel = new Reel(
        this.bands[i],
        i * this.reelWidth,
        0,
        this.reelWidth,
        this.rows,
        this.symbolAssets,
      );
      this.reels.push(reel);
      this.container.addChild(reel.container);
    }
  }
  //When the spin button is clicked, generate new reels with random positions.
  spin(): { positions: number[]; screenSymbols: string[][] } {
    const positions: number[] = [];
    const screenSymbols: string[][] = Array.from(
      { length: this.rows },
      () => [],
    );
    for (let i = 0; i < this.cols; i++) {
      const { position, symbols } = this.reels[i].spin(
        this.symbolAssets,
        this.rows,
      );
      positions.push(position);
      for (let j = 0; j < this.rows; j++) {
        screenSymbols[j][i] = symbols[j];
      }
    }
    return { positions, screenSymbols };
  }
}
