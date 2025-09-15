import { Application, Text } from "pixi.js";
import { Paylines } from "./Paylines";

export class WinText {
  public winText: Text;
  //Constructor for win text
  constructor(public app: Application) {
    this.winText = new Text({
      text: "",
      style: {
        fontFamily: "monospace",
        fontSize: 15,
        align: "left",
      },
    });
    this.winText.anchor.set(0.5, 0);
    this.winText.x = app.screen.width / 2 + 50;
    this.winText.y = app.screen.height / 2 + 50;
    app.stage.addChild(this.winText);
  }
  //Update and show win text when the spin button is clicked
  update(screenSymbols: string[][], positions: number[], paylines: Paylines) {
    const { totalWin, details } = paylines.calculate(screenSymbols);
    const screenText = screenSymbols.map((r) => r.join(" ")).join("\n");
    if (totalWin > 0) {
      this.winText.text = `Positions: ${positions.join(", ")}\nScreen:\n${screenText}\nTotal wins: ${totalWin}\n${details.join("\n")}`;
    } else {
      this.winText.text = `Positions: ${positions.join(", ")}\nScreen:\n${screenText}\nTotal wins: 0`;
    }
  }
}
