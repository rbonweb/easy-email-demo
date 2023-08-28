import { BlockManager } from "easy-email-core";
import { BlockAttributeConfigurationManager } from "easy-email-extensions";
import { CustomBlocksType } from "./constants";
import { HelloSajjad, Panel as HelloSajjadPanel } from "./HelloSajjadBlock";

BlockManager.registerBlocks({
  [CustomBlocksType.HELLO_SAJJAD_BLOCK]: HelloSajjad,
});

BlockAttributeConfigurationManager.add({
  [CustomBlocksType.HELLO_SAJJAD_BLOCK]: HelloSajjadPanel,
});
