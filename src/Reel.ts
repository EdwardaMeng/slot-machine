import { Container, Sprite, Texture } from "pixi.js";

export class Reel {
  container: Container;
  band: string[];
  position: number;
  sprites: Sprite[];

  //Constructor for reel
  constructor(
    band: string[],
    x: number,
    y: number,
    reelWidth: number,
    rows: number,
    symbolAssets: Record<string, string>,
  ) {
    this.band = band;
    this.position = 0;
    this.sprites = [];
    this.container = new Container();
    this.container.x = x;
    this.container.y = y;
    //Print the initial symbols by every row
    for (let j = 0; j < rows; j++) {
      const symbolId = this.band[(this.position + j) % this.band.length];
      const sprite = Sprite.from(Texture.from(symbolAssets[symbolId]));
      sprite.y = j * reelWidth;
      sprite.width = reelWidth * 0.8;
      sprite.height = reelWidth * 0.8;
      this.container.addChild(sprite);
      this.sprites.push(sprite);
    }
  }
  //When the spin button is clicked, generate a random number and print the current row with symbols
  spin(
    symbolAssets: Record<string, string>,
    rows: number,
  ): { position: number; symbols: string[] } {
    this.position = Math.floor(Math.random() * this.band.length);
    const symbols: string[] = [];

    for (let j = 0; j < rows; j++) {
      const symbolId = this.band[(this.position + j) % this.band.length];
      this.sprites[j].texture = Texture.from(symbolAssets[symbolId]);
      symbols.push(symbolId);
    }

    return { position: this.position, symbols };
  }
}
