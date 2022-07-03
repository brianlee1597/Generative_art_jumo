// import fs from "fs";

type OneNFTSet = { [key: string]: string; };

interface MintFunction {
    generateNFTs (numOfNfts: number): void;
}

class NFTGenerator implements MintFunction {
    private generatedSet: Set<string>;
    private attrMap: Map<string, string>;

    constructor () {
        this.generatedSet = new Set();
        this.attrMap = new Map();
    }

    private pickRandomFrom (arr: string[]) {
        return ""; //placehodler
    }

    private pickRandomAttributesSet () {
        const arr = Object.fromEntries(this.attrMap);

        return {}; //placeholder
    }

    private printOnCanvas (set: OneNFTSet) {

    }

    private clearCanvas () {

    }

    generateNFTs (numOfNfts: number) {

    }
}