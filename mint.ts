type Path = string;

type GeneratedSet = {
    [key: string]: Path;
};

interface MintStates {
    generatedSet: Set<string>;
}

interface MintFunctions {
    cacheImageBuffer (): void;
    pickRandomFrom (arr: string[]): string;
    pickRandomAttributesSet (): GeneratedSet;
    printOnCanvas (set: GeneratedSet): void;
    clearCanvas (): void;
}

class NFTGenerator implements MintStates, MintFunctions {
    generatedSet: Set<string>;

    constructor () {
        this.generatedSet = new Set<string>();
    }

    cacheImageBuffer () {

    }

    pickRandomFrom (arr: string[]) {
        return ""; //placehodler;
    }

    pickRandomAttributesSet () {
        return {}; //placeholder
    }

    printOnCanvas (set: GeneratedSet) {

    }

    clearCanvas () {

    }
}