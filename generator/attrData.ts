export type AttrData = {
    name: string;
    attributes: string[];
    weights: number[];
}

export const attrData: AttrData[] = [
    {
        name: "Background",
        attributes: ["Choga", "Hanok"],
        weights: [0.5, 0.5],
    },
    {
        name: "Body",
        attributes: ["Base 1"],
        weights: [1],
    },
    {
        name: "Apparel",
        attributes: ["Black Hanbok", "Green Hanbok", "Hoodie"],
        weights: [0.4, 0.4, 0.2],
    },
    {
        name: "Brooch",
        attributes: ["Blue Flower", "Blue Norigae", "Green Flower", "Nametag", "Red Flower"],
        weights: new Array(5).fill(0.2),
    },
    {
        name: "Necklace",
        attributes: ["Blue", "Green", "Red", "White"],
        weights: new Array(4).fill(0.25),
    },
    {
        name: "Hand",
        attributes: ["Peace", "Point", "Wine"],
        weights: [0.4, 0.4, 0.2],
    },
    {
        name: "Bracelet",
        attributes: ["Blue", "Green", "Red"],
        weights: [0.35, 0.35, 0.30],
    },
    {
        name: "Hair",
        attributes: ["None", "Longbraid", "Lowpony", "Upstyle"],
        weights: [0.1, 0.3, 0.4, 0.2],
    },
    {
        name: "Hat",
        attributes: ["None", "Green", "Red"],
        weights: [0.8, 0.1, 0.1],
    },
    {
        name: "Hair Accessory",
        attributes: ["None", "Flower", "Ribbon"],
        weights: [0.5, 0.25, 0.25],
    },
    {
        name: "Earrings",
        attributes: ["Blue Flower", "Blue Hoop", "Butterfly", "Green Hoop", "Red Hoop"],
        weights: new Array(5).fill(0.2),
    },
    {
        name: "Eye Shadow",
        attributes: ["Brown", "Green", "Orange", "Purple"],
        weights: new Array(4).fill(0.25),
    },
    {
        name: "Eyebrows",
        attributes: ["Blonde", "Brown Normal", "Brown Round", "Brown Up"],
        weights: new Array(4).fill(0.25),
    },
    {
        name: "Eyelashes",
        attributes: ["Equal", "Side"],
        weights: [0.5, 0.5],
    },
    {
        name: "Lips",
        attributes: ["Orange", "Pink", "Purple", "Red"],
        weights: new Array(4).fill(0.25),
    },
    {
        name: "Blush",
        attributes: ["Orange", "Pink", "Purple", "Red"],
        weights: new Array(4).fill(0.25),
    },
]