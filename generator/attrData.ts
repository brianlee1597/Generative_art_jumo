export type AttrData = {
    trait_type: string;
    value: string[];
    weights: number[];
}

export const attrData: AttrData[] = [
    {
        trait_type: "Background",
        value: ["Choga", "Hanok"],
        weights: [0.5, 0.5],
    },
    {
        trait_type: "Body",
        value: ["Base 1"],
        weights: [1],
    },
    {
        trait_type: "Apparel",
        value: ["Black Hanbok", "Green Hanbok", "Hoodie"],
        weights: [0.4, 0.4, 0.2],
    },
    {
        trait_type: "Brooch",
        value: ["Blue Flower", "Blue Norigae", "Green Flower", "Name Tag", "Red Flower"],
        weights: new Array(5).fill(0.2),
    },
    {
        trait_type: "Necklace",
        value: ["Blue", "Green", "Red", "White"],
        weights: new Array(4).fill(0.25),
    },
    {
        trait_type: "Hand",
        value: ["Peace", "Point", "Wine"],
        weights: [0.4, 0.4, 0.2],
    },
    {
        trait_type: "Bracelet",
        value: ["Blue", "Green", "Red"],
        weights: [0.35, 0.35, 0.30],
    },
    {
        trait_type: "Hair",
        value: ["None", "Longbraid", "Lowpony", "Upstyle"],
        weights: [0.1, 0.3, 0.4, 0.2],
    },
    {
        trait_type: "Hat",
        value: ["None", "Green", "Red"],
        weights: [0.8, 0.1, 0.1],
    },
    {
        trait_type: "Hair Accessory",
        value: ["None", "Flower", "Ribbon"],
        weights: [0.5, 0.25, 0.25],
    },
    {
        trait_type: "Earrings",
        value: ["Blue Flower", "Blue Hoop", "Butterfly", "Green Hoop", "Red Hoop"],
        weights: new Array(5).fill(0.2),
    },
    {
        trait_type: "Eye Shadow",
        value: ["Brown", "Green", "Orange", "Purple"],
        weights: new Array(4).fill(0.25),
    },
    {
        trait_type: "Eyebrows",
        value: ["Blonde", "Brown Normal", "Brown Round", "Brown Up"],
        weights: new Array(4).fill(0.25),
    },
    {
        trait_type: "Eyelashes",
        value: ["Equal", "Side"],
        weights: [0.5, 0.5],
    },
    {
        trait_type: "Lips",
        value: ["Orange", "Pink", "Purple", "Red"],
        weights: new Array(4).fill(0.25),
    },
    {
        trait_type: "Blush",
        value: ["Orange", "Pink", "Purple", "Red"],
        weights: new Array(4).fill(0.25),
    },
]