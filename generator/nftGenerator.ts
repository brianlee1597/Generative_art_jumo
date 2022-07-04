import fs from "fs";
import weighted from 'weighted';
import cliProgress from "cli-progress";
import { Canvas, CanvasRenderingContext2D, createCanvas, loadImage } from "canvas";
import { type AttrData } from "./attrData";

type AttrSet = { trait_type: string, value: string };
type MetaData = { 
    filename: string, 
    attributes: AttrSet[] 
}
type FinalResult = { 
    nftMetaData: MetaData[], 
    rarityReport: any 
};
type FrequencyTracker = {
    [key: string]: [{
        [key: string]: number,
    }, number];
}

interface MintFunction {
    cacheImageBuffers (): Promise<void>;
    generateNFTs (name: string, attrData: AttrData[], numOfNfts: number): FinalResult;
}

export default class NFTGenerator implements MintFunction {
    private pathImageMap: Map<string, Map<string, any>>;
    private generatedSet: Set<string>;
    private canvas: Canvas;
    private ctx: CanvasRenderingContext2D;
    private nftDir: string;
    private pngDir: string;
    public frequencyTracker: FrequencyTracker;
    public metaDir: string;

    constructor (width: number, height: number) {
        this.pathImageMap = new Map();
        this.generatedSet = new Set();
        this.canvas = createCanvas(width, height);
        this.ctx = this.canvas.getContext('2d');
        this.frequencyTracker = {};
        this.nftDir = "./nfts";
        this.pngDir = "./pngs";
        this.metaDir = "./metadata";

        if (!fs.existsSync(this.pngDir))
            throw new Error("The PNG folder (/pngs) doesn't exist");

        if (!fs.existsSync(this.nftDir))
            fs.mkdirSync(this.nftDir);

        if (!fs.existsSync(this.metaDir))
            fs.mkdirSync(this.metaDir);
    }

    private pickRandomFrom (attr: AttrData): string {
        const values = attr.value, weights = attr.weights;
        let value = weighted.select(values, weights);
        return value;
    }

    private getRandomAttributesSet (attrData: AttrData[]): AttrSet[] {
        const attrSet: AttrSet[] = [];

        attrData.forEach(attrs => {
            const trait_type = attrs.trait_type;
            const value = this.pickRandomFrom(attrs);
            attrSet.push({ trait_type, value });
        })

        return attrSet;
    }

    private printOnCanvas (set: AttrSet[]): void {
        set.forEach(attr => {
            const { trait_type, value } = attr;
            if (value.includes("None")) return;

            const folder = this.pathImageMap.get(trait_type);
            if (!folder)
                throw new Error(`No folder found for ${trait_type}`);

            const imageBuffer = folder.get(`${value}.png`);
            if (!imageBuffer) 
                throw new Error(`No image ${value} found in ${trait_type}`);

            this.ctx.drawImage(imageBuffer, 0, 0);
        })
    }

    private clearCanvas (): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public async cacheImageBuffers (): Promise<void> {
        const attrsList = fs.readdirSync("./pngs")
        .filter(file => !file.includes("DS_Store"));

        for (const attrs of attrsList) {
            const attrList = fs.readdirSync(`./pngs/${attrs}`)
            .filter(file => !file.includes("DS_Store"));
            const imageMap = new Map();
            this.frequencyTracker[attrs] = [{}, 0];

            for (const attr of attrList) {
                const image = await loadImage(`./pngs/${attrs}/${attr}`);
                const value = attr.replace(".png", "");
                imageMap.set(attr, image);
                this.frequencyTracker[attrs][0][value] = 0;
            }

            this.pathImageMap.set(attrs, imageMap);
        };
    }

    public generateNFTs (name: string, attrData: AttrData[], numOfNfts: number): FinalResult {
        let i = 1, nftMetaData: MetaData[] = [];
        const mintBar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

        mintBar.start(numOfNfts, 0);

        while (i <= numOfNfts) {
            const attrSet = this.getRandomAttributesSet(attrData);
            if (this.generatedSet.has(JSON.stringify(attrSet))) continue;

            attrSet.forEach(attr => {
                if (attr.value.includes("None") && 
                this.frequencyTracker[attr.trait_type][0][attr.value] === undefined) {
                    this.frequencyTracker[attr.trait_type][0][attr.value] = 0;
                }

                this.frequencyTracker[attr.trait_type][0][attr.value] += 1;
                this.frequencyTracker[attr.trait_type][1] += 1;
            })
            
            this.printOnCanvas(attrSet);
            const buffer = this.canvas.toBuffer("image/png");
            fs.writeFileSync(`${this.nftDir}/${name} #${i}.png`, buffer);
            this.clearCanvas();

            const metadata = {
                filename: `${name} #${i++}.png`,
                attributes: attrSet,
            }

            nftMetaData.push(metadata);
            mintBar.increment();
        }

        mintBar.stop();

        const rarityReport = attrData.map(data => {
            const [frequencies, total] = this.frequencyTracker[data.trait_type];
    
            return {
                trait_type: data.trait_type,
                values: data.value.map(val => {
                    const desiredRarity = data.weights[data.value.indexOf(val)] * 100;
                    const actualRarity  = + (frequencies[val] / total * 100).toString().split(".")[0];
    
                    return {
                        value: val,
                        desiredRarity,
                        actualRarity,
                    }
                })
            }
        });

        return { nftMetaData, rarityReport };
    }
}