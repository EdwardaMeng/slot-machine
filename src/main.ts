import { Application, Assets, Container, Sprite, Text, Texture } from "pixi.js";

(async () => {
  // Create a new application
  const app = new Application();

  // Initialize the application
  await app.init({ background: "#1099bb", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const winText = new Text({
    text: "",
    style: {},
  });

  const positions = [0, 0, 0, 0, 0];

  const bands = [
    [
      "hv2",
      "lv3",
      "lv3",
      "hv1",
      "hv1",
      "lv1",
      "hv1",
      "hv4",
      "lv1",
      "hv3",
      "hv2",
      "lv3",
      "lv4",
      "hv4",
      "lv1",
      "hv2",
      "lv4",
      "lv1",
      "lv3",
      "hv2",
    ],
    [
      "hv1",
      "lv2",
      "lv3",
      "lv2",
      "lv1",
      "lv1",
      "lv4",
      "lv1",
      "lv1",
      "hv4",
      "lv3",
      "hv2",
      "lv1",
      "lv3",
      "hv1",
      "lv1",
      "lv2",
      "lv4",
      "lv3",
      "lv2",
    ],
    [
      "lv1",
      "hv2",
      "lv3",
      "lv4",
      "hv3",
      "hv2",
      "lv2",
      "hv2",
      "hv2",
      "lv1",
      "hv3",
      "lv1",
      "hv1",
      "lv2",
      "hv3",
      "hv2",
      "hv4",
      "hv1",
      "lv2",
      "lv4",
    ],
    [
      "hv2",
      "lv2",
      "hv3",
      "lv2",
      "lv4",
      "lv4",
      "hv3",
      "lv2",
      "lv4",
      "hv1",
      "lv1",
      "hv1",
      "lv2",
      "hv3",
      "lv2",
      "lv3",
      "hv2",
      "lv1",
      "hv3",
      "lv2",
    ],
    [
      "lv3",
      "lv4",
      "hv2",
      "hv3",
      "hv4",
      "hv1",
      "hv3",
      "hv2",
      "hv2",
      "hv4",
      "hv4",
      "hv2",
      "lv2",
      "hv4",
      "hv1",
      "lv2",
      "hv1",
      "lv2",
      "hv4",
      "lv4",
    ],
  ];

  const loadingText = new Text({
    text: "Loading: 0%",
    style: {
      fill: "#ffffff",
      fontSize: 36,
      fontWeight: "bold",
      align: "center",
    },
    anchor: 0.5,
  });
  loadingText.x = app.screen.width / 2;
  loadingText.y = app.screen.height / 2;
  app.stage.addChild(loadingText);

  const payTable: Record<string, Record<number, number>> = {
    hv1: { 3: 10, 4: 20, 5: 50 },
    hv2: { 3: 5, 4: 10, 5: 20 },
    hv3: { 3: 5, 4: 10, 5: 15 },
    hv4: { 3: 5, 4: 10, 5: 15 },
    lv1: { 3: 2, 4: 5, 5: 10 },
    lv2: { 3: 1, 4: 2, 5: 5 },
    lv3: { 3: 1, 4: 2, 5: 3 },
    lv4: { 3: 1, 4: 2, 5: 3 },
  };

  const payLines: number[][] = [
    [0, 0, 0, 0, 0], // payline1: top row
    [1, 1, 1, 1, 1], // payline2: middle row
    [2, 2, 2, 2, 2], // payline3: bottom row
    [0, 0, 1, 2, 2], // payline4: z
    [2, 2, 1, 0, 0], // payline5: reverse z
    [0, 1, 2, 1, 0], // payline6: v
    [2, 1, 0, 1, 2], // payline7: reverse v
  ];

  const symbolAssets: Record<string, string> = {
    hv1: "/assets/hv1_symbol.png",
    hv2: "/assets/hv2_symbol.png",
    hv3: "/assets/hv3_symbol.png",
    hv4: "/assets/hv4_symbol.png",
    lv1: "/assets/lv1_symbol.png",
    lv2: "/assets/lv2_symbol.png",
    lv3: "/assets/lv3_symbol.png",
    lv4: "/assets/lv4_symbol.png",
  };

  // const spin_button = Assets.load("/assets/spin_button.png");

  const total = Object.keys(symbolAssets).length + 1;
  let loaded = 0;
  const rows = 3;
  const cols = 5;
  const screenSymbols: string[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(""),
  );

  async function preload() {
    for (const id in symbolAssets) {
      await Assets.load(symbolAssets[id]);
      loaded++;
      loadingText.text = `Loading ${Math.round((loaded / total) * 100)}%`;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    await Assets.load("/assets/spin_button.png");
    loaded++;
    loadingText.text = `Loading ${Math.round((loaded / total) * 100)}%`;
    await new Promise((resolve) => setTimeout(resolve, 100));
    // 加载完成，移除文本
    app.stage.removeChild(loadingText);
    initGame();
  }

  await preload();

  function initGame() {
    const reelsContainer = new Container();
    app.stage.addChild(reelsContainer);
    const reels: Container[] = [];
    const reelSprites: Sprite[][] = [];
    const reelWidth = 120;

    for (let i = 0; i < 5; i++) {
      const container = new Container();
      container.x = i * 120; // 每列位置
      container.y = 0;
      reelsContainer.addChild(container);
      reels.push(container);

      reelsContainer.x = (app.renderer.width - 5 * reelWidth) / 2; // 水平居中
      reelsContainer.y = 100;

      const sprites: Sprite[] = [];
      for (let j = 0; j < 3; j++) {
        const symbolId = bands[i][(positions[i] + j) % bands[i].length]; // 初始符号
        const sprite = Sprite.from(Texture.from(symbolAssets[symbolId]));
        screenSymbols[i][j] = symbolId;
        sprite.y = j * 120;
        sprite.width = 100;
        sprite.height = 100;
        container.addChild(sprite);
        sprites.push(sprite);
      }
      reelSprites.push(sprites);
    }
    const spin_button = Sprite.from(Texture.from("/assets/spin_button.png"));
    spin_button.x = app.renderer.width / 2 - 800;
    spin_button.y = app.renderer.height - 400;
    spin_button.interactive = true;
    reelsContainer.addChild(spin_button);

    spin_button.on("pointerdown", () => {
      for (let i = 0; i < 5; i++) {
        positions[i] = Math.floor(Math.random() * bands[i].length);
        for (let j = 0; j < 3; j++) {
          const symbolId = bands[i][(positions[i] + j) % bands[i].length];
          reelSprites[i][j].texture = Texture.from(symbolAssets[symbolId]);
        }
      }
      calculateWin();
    });

    winText.x = app.renderer.width / 2;
    winText.y = reelsContainer.y + 380;
    winText.anchor.set(0.5, 0);
    reelsContainer.addChild(winText);
  }

  function calculateWin() {
    let totalWin = 0;
    const details: string[] = [];
    winText.text = `Positions: ${positions.join(", ")}\n`;
    for (let row = 0; row < screenSymbols.length; row++) {
      winText.text = "  " + screenSymbols[row].join(" ") + "\n";
    }

    for (let p = 0; p < payLines.length; p++) {
      const line = payLines[p];
      const matchSymbol = bands[0][(positions[0] + line[0]) % bands[0].length];
      let count = 1;

      for (let c = 1; c < 5; c++) {
        const symbolId = bands[c][(positions[c] + line[c]) % bands[c].length];
        if (symbolId === matchSymbol) count++;
        else break; // 左到右连续匹配
      }

      if (count >= 3) {
        const payout = payTable[matchSymbol][count];
        totalWin += payout;
        details.push(`payline ${p + 1}, ${matchSymbol} x${count}, ${payout}`);
      }
    }

    // 更新 winText
    if (totalWin > 0) {
      winText.text = `Total wins: ${totalWin}\n` + details.join("\n");
    } else {
      winText.text = `Total wins: 0`;
    }
  }
})();
