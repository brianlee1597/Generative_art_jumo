import fs from "fs";
import weighted from 'weighted';
import { Canvas, CanvasRenderingContext2D, createCanvas, loadImage } from "canvas";
import { type AttrData } from "./attrData";

type Attr = { attribute: string };
type AttrSet = { name: string, attribute: string };

interface MintFunction {
    cacheImageBuffers (): Promise<void>;
    generateNFTs (name: string, attrData: AttrData[], numOfNfts: number): void;
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
        const attribute = weighted.select(attr.attributes, attr.weights) + ".png";
        return { attribute };
    }

    private getRandomAttributesSet (attrData: AttrData[]): AttrSet[] {
        const attrSet: AttrSet[] = [];

        attrData.forEach(attrs => {
            const attr = this.pickRandomFrom(attrs);
            attrSet.push({ name: attrs.name, ...attr });
        })

        return attrSet;
    }

    private printOnCanvas (set: AttrSet[]): void {
        set.forEach(attr => {
            if (attr.attribute.includes("None")) return;

            const folder = this.pathImageMap.get(attr.name);
            if (!folder) throw new Error(`No folder found for ${attr.name}`);

            const imageBuffer = folder.get(attr.attribute);
            if (!imageBuffer) throw new Error(`No image ${attr.attribute} found in ${attr.name}`);

            this.ctx.drawImage(imageBuffer, 0, 0);
        })
    }

    private clearCanvas (): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public async cacheImageBuffers (): Promise<void> {
        const attrsList = fs.readdirSync("./pngs");
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

    public generateNFTs (name: string, attrData: AttrData[], numOfNfts: number): void {
        let i = 1;

        while (i <= numOfNfts) {
            const attrSet = this.getRandomAttributesSet(attrData);
            if (this.generatedSet.has(JSON.stringify(attrSet))) continue;
            
            this.printOnCanvas(attrSet);
            const buffer = this.canvas.toBuffer("image/png");
            fs.writeFileSync(`./nfts/${name} #${i++}.png`, buffer);
            this.clearCanvas();
        }
    }
}