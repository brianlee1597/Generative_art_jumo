import fs from "fs";
import rls from "readline-sync";
import NFTGenerator from "./generator/nftGenerator";
import { attrData } from "./generator/attrData";

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
    
    console.log("------------------------------------------------------------------------------");
    console.log("----------------------------Starting NFT Generation---------------------------");
    console.log("------------------------------------------------------------------------------");

    const metadata = nftFactory.generateNFTs(name, attrData, nums);
    const rarityReport = attrData.map(data => {
        const [frequencies, total] = nftFactory.frequencyTracker[data.trait_type];

        return {
            trait_type: data.trait_type,
            values: data.value.map(val => {
                const desiredRarity = data.weights[data.value.indexOf(val)] * 100;
                const actualRarity  = +(frequencies[val] / total * 100).toString().split(".")[0];

                return {
                    value: val,
                    desiredRarity,
                    actualRarity,
                }
            })
        }
    });

    fs.writeFileSync(`${nftFactory.metaDir}/nfts.json`, JSON.stringify(metadata));
    fs.writeFileSync(`${nftFactory.metaDir}/report.json`, JSON.stringify(rarityReport));

    console.log("------------------------------------------------------------------------------");
    console.log("----------------------------Finished NFT Generation---------------------------");
    console.log("------------------------------------------------------------------------------");
})();