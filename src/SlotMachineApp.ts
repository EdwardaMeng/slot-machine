import { Application, Sprite, Texture, Assets, Text } from "pixi.js";
import { ReelsContainer } from "./ReelsContainer";
import { WinText } from "./WinText";
import { Paylines } from "./Paylines";

export class SlotMachineApp {
  public app: Application;
  public reelsContainer!: ReelsContainer;
  public winText!: WinText;
  public positions = [0, 0, 0, 0, 0];
  public loadingText: Text;
  //Constructor for slot machine app
  constructor(
    private bands: string[][],
    private symbolAssets: Record<string, string>,
    private payTable: Record<string, Record<number, number>>,
    private payLines: number[][],
  ) {
    this.app = new Application();
    this.loadingText = new Text({
      text: "Loading 0%",
      style: {
        fill: "#ffffff",
        fontSize: 36,
        fontWeight: "bold",
        align: "center",
      },
      anchor: 0.5,
    });
  }
  //Initialize the app
  async init() {
    await this.app.init({ background: "#1099bb", resizeTo: window });
    document.getElementById("pixi-container")!.appendChild(this.app.canvas);
    await this.preload();
  }
  //Preload method for showing loading text while the app is loading assets
  async preload() {
    const total = Object.keys(this.symbolAssets).length + 1;
    let loaded = 0;
    this.loadingText.x = this.app.screen.width / 2;
    this.loadingText.y = this.app.screen.height / 2;
    this.app.stage.addChild(this.loadingText);

    for (const id in this.symbolAssets) {
      await Assets.load(this.symbolAssets[id]);
      loaded++;
      this.loadingText.text = `Loading ${Math.round((loaded / total) * 100)}%`;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    await Assets.load("/assets/spin_button.png");
    loaded++;
    this.loadingText.text = `Loading ${Math.round((loaded / total) * 100)}%`;
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.app.stage.removeChild(this.loadingText);
    this.initGame();
  }
  //Initialize the slot machine
  initGame() {
    //Generate the initial reels
    this.reelsContainer = new ReelsContainer(
      this.bands,
      3,
      5,
      120,
      this.symbolAssets,
    );
    this.reelsContainer.container.x = this.app.screen.width / 2 - 300;
    this.reelsContainer.container.y = this.app.screen.height / 2 - 300;
    this.app.stage.addChild(this.reelsContainer.container);
    //Get the paylines
    const paylines = new Paylines(this.payLines, this.payTable);
    //Generate win text
    this.winText = new WinText(this.app);
    //Generate the spin button
    const spinButton = Sprite.from(Texture.from("/assets/spin_button.png"));
    spinButton.interactive = true;
    spinButton.scale.set(0.5);
    spinButton.x = this.reelsContainer.container.x;
    spinButton.y = this.reelsContainer.container.y + 400;
    this.app.stage.addChild(spinButton);
    //Click function for spin button
    spinButton.on("pointerdown", () => {
      const result = this.reelsContainer.spin();
      this.winText.update(result.screenSymbols, result.positions, paylines);
    });
  }
}
