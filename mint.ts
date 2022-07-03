// import fs from "fs";
import List from "dbly-linked-list";

type OneNFTSet = { [key: string]: string; };

interface MintFunction {
    generateNFTs (numOfNfts: number): void;
}

class NFTGenerator implements MintFunction {
    private pathBufferMap: Map<string, any>;
    private generatedSet: Set<string>;
    private attrList: List;

    constructor () {
        this.pathBufferMap = new Map();
        this.generatedSet = new Set();
        this.attrList = new List();
    }

    private cacheImageBuffers () {
        
    }

    private pickRandomFrom (arr: string[]) {
        return ""; //placehodler
    }

    private getRandomAttributesSet () {
        return {}; //placeholder
    }

    private printOnCanvas (set: OneNFTSet) {

    }

    private clearCanvas () {

    }

    generateNFTs (numOfNfts: number) {

    }
}