export type CropKc = {
    kcIni: number;
    kcMid: number;
    kcEnd: number;
};

export const cropData: { [crop: string]: CropKc } = {
    alfalfa: { kcIni: 0.4, kcMid: 1.2, kcEnd: 1.15 },
    onions: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.95 },
    apples: { kcIni: 0.5, kcMid: 1.2, kcEnd: 0.85 },
    pasture: { kcIni: 0.4, kcMid: 1, kcEnd: 0.85 },
    apricots: { kcIni: 0.45, kcMid: 1.15, kcEnd: 0.85 },
    peaches: { kcIni: 0.45, kcMid: 1.15, kcEnd: 0.85 },
    beansGreen: { kcIni: 0.5, kcMid: 1.05, kcEnd: 0.9 },
    pears: { kcIni: 0.5, kcMid: 1.2, kcEnd: 0.85 },
    beets: { kcIni: 0.5, kcMid: 1.05, kcEnd: 0.95 },
    peas: { kcIni: 0.5, kcMid: 1.15, kcEnd: 1.1 },
    berriesBushes: { kcIni: 0.3, kcMid: 1.05, kcEnd: 0.5 },
    potato: { kcIni: 0.5, kcMid: 1.15, kcEnd: 0.75 },
    broccoli: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.95 },
    pumpkin: { kcIni: 0.5, kcMid: 1, kcEnd: 0.8 },
    cabbage: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.95 },
    radish: { kcIni: 0.7, kcMid: 0.9, kcEnd: 0.85 },
    cabbageLocal: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.95 },
    smallVegetables: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.95 },
    carrots: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.95 },
    spinach: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.95 },
    cauliflower: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.95 },
    squash: { kcIni: 0.5, kcMid: 0.95, kcEnd: 0.75 },
    celery: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.95 },
    stoneFruits: { kcIni: 0.45, kcMid: 1.15, kcEnd: 0.85 },
    cereal: { kcIni: 0.3, kcMid: 1.15, kcEnd: 0.25 },
    sweetCorn: { kcIni: 0.3, kcMid: 1.15, kcEnd: 0.4 },
    cherries: { kcIni: 0.5, kcMid: 1.2, kcEnd: 0.85 },
    sweetPeppers: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.85 },
    cucumber: { kcIni: 0.6, kcMid: 1, kcEnd: 0.75 },
    tomato: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.8 },
    grapes: { kcIni: 0.3, kcMid: 0.8, kcEnd: 0.5 },
    tubers: { kcIni: 0.5, kcMid: 1.05, kcEnd: 0.95 },
    greenOnions: { kcIni: 0.7, kcMid: 1.05, kcEnd: 0.95 },
    watermelon: { kcIni: 0.4, kcMid: 1, kcEnd: 0.75 },
    lettuce: { kcIni: 0.7, kcMid: 1, kcEnd: 0.95 }
};