import rls from "readline-sync";
import NFTGenerator from "./generator/nftGenerator";
import { attrData } from "./generator/attrData";

(async () => {
    let totalCombo = 1;
    attrData
    .map(attrs => attrs.attributes)
    .forEach(attr => totalCombo *= attr.length);

    const name = rls.question("What is the name of your collection?");
    const nums = rls.questionInt("How Many NFTs Do You Want To Generate?");

    if (nums > totalCombo) 
        throw new Error("Your Input Exceeds total combinations available");

    const nftFactory = new NFTGenerator();
    await nftFactory.cacheImageBuffers();
    nftFactory.generateNFTs(name, attrData, nums);
})();