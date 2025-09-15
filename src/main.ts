import { SlotMachineApp } from "./SlotMachineApp";
import { bands, symbolAssets, payTable, payLines } from "./config";

(async () => {
  //Create new slot machine app
  const slot = new SlotMachineApp(bands, symbolAssets, payTable, payLines);
  //Initiate the app
  await slot.init();
})();
