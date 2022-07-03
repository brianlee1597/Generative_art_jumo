import rls from "readline-sync";
import NFTGenerator from "./generator/nftGenerator";
import { attrData } from "./generator/attrData";
import fs from "fs";

(async () => {
    let totalCombo = 1;
    attrData
    .map(attrs => attrs.value)
    .forEach(attr => totalCombo *= attr.length);

    const name   = rls.question("What is the name of your collection? ");
    const nums   = rls.questionInt("How Many NFTs Do You Want To Generate? ");
    const width  = rls.questionInt("What is the pixel width of the NFT? ");
    const height = rls.questionInt("What is the pixel height of the NFT? ");

    if (nums > totalCombo) 
        throw new Error("Your Input Exceeds total combinations available");

    const nftFactory = new NFTGenerator(width, height);
    await nftFactory.cacheImageBuffers();
    const metadata = nftFactory.generateNFTs(name, attrData, nums);
    fs.writeFileSync("./metadata/nfts.json", JSON.stringify(metadata));
})();