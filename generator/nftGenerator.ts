import fs from "fs";
import weighted from 'weighted';
import { Canvas, CanvasRenderingContext2D, createCanvas, loadImage } from "canvas";
import { type AttrData } from "./attrData";

type Attr = { value: string };
type AttrSet = { trait_type: string, value: string };
type MetaData = { filename: string, attributes: AttrSet[] };

interface MintFunction {
    cacheImageBuffers (): Promise<void>;
    generateNFTs (name: string, attrData: AttrData[], numOfNfts: number): MetaData[];
}

export default class NFTGenerator implements MintFunction {
    private pathImageMap: Map<string, Map<string, any>>;
    private generatedSet: Set<string>;
    private canvas: Canvas;
    private ctx: CanvasRenderingContext2D;

    constructor (width: number, height: number) {
        this.pathImageMap = new Map();
        this.generatedSet = new Set();
        this.canvas = createCanvas(width, height);
        this.ctx = this.canvas.getContext('2d');
    }

    private pickRandomFrom (attr: AttrData): Attr {
        const value = weighted.select(attr.value, attr.weights) + ".png";
        return { value };
    }

    private getRandomAttributesSet (attrData: AttrData[]): AttrSet[] {
        const attrSet: AttrSet[] = [];

        attrData.forEach(attrs => {
            const attr = this.pickRandomFrom(attrs);
            attrSet.push({ trait_type: attrs.trait_type, ...attr });
        })

        return attrSet;
    }

    private printOnCanvas (set: AttrSet[]): void {
        set.forEach(attr => {
            if (attr.value.includes("None")) return;

            const folder = this.pathImageMap.get(attr.trait_type);
            if (!folder) throw new Error(`No folder found for ${attr.trait_type}`);

            const imageBuffer = folder.get(attr.value);
            if (!imageBuffer) throw new Error(`No image ${attr.value} found in ${attr.trait_type}`);

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

            for (const attr of attrList) {
                const image = await loadImage(`./pngs/${attrs}/${attr}`);
                imageMap.set(attr, image);
            }

            this.pathImageMap.set(attrs, imageMap);
        };
    }

    public generateNFTs (name: string, attrData: AttrData[], numOfNfts: number): MetaData[] {
        let i = 1, nftMetadata: MetaData[] = [];

        while (i <= numOfNfts) {
            const attrSet = this.getRandomAttributesSet(attrData);
            if (this.generatedSet.has(JSON.stringify(attrSet))) continue;
            
            this.printOnCanvas(attrSet);
            const buffer = this.canvas.toBuffer("image/png");
            fs.writeFileSync(`./nfts/${name} #${i++}.png`, buffer);
            this.clearCanvas();

            const metadata = {
                filename: `${name} #${i++}.png`,
                attributes: attrSet,
            }

            nftMetadata.push(metadata);
        }

        return nftMetadata;
    }
}