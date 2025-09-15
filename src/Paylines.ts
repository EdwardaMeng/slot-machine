export class Paylines {
  //Constructor for paylines
  constructor(
    private payLines: number[][],
    private payTable: Record<string, Record<number, number>>,
  ) {}
  //Calculation Method for the win
  calculate(screenSymbols: string[][]): {
    totalWin: number;
    details: string[];
  } {
    let totalWin = 0;
    const details: string[] = [];

    //Traverse every symbol to try to match the paylines
    for (let p = 0; p < this.payLines.length; p++) {
      const line = this.payLines[p];
      const matchSymbol = screenSymbols[line[0]][0];
      let count = 1;
      for (let c = 1; c < line.length; c++) {
        if (screenSymbols[line[c]][c] === matchSymbol) count++;
        else break;
      }
      //If payline is matched, print the win details
      if (count >= 3) {
        const payout = this.payTable[matchSymbol][count];
        totalWin += payout;
        details.push(`- payline ${p + 1}, ${matchSymbol} x${count}, ${payout}`);
      }
    }
    return { totalWin, details };
  }
}
