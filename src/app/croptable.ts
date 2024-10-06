export const GrowthStage = [
    'Seedling',
    'Adult',
    'Elderly'
]

export const CropType = [
    'alfalfa',
    'onions',
    'apples',
    'pasture',
    'apricots',
    'peaches',
    'beansGreen',
    'pears',
    'beets',
    'peas',
    'berriesBushes',
    'potato',
    'broccoli',
    'pumpkin',
    'cabbage',
    'radish',
    'cabbageLocal',
    'smallVegetables',
    'carrots',
    'spinach',
    'cauliflower',
    'squash',
    'celery',
    'stoneFruits',
    'cereal',
    'sweetCorn',
    'cherries',
    'sweetPeppers',
    'cucumber',
    'tomato',
    'grapes',
    'tubers',
    'greenOnions',
    'watermelon',
    'lettuce',
];



export const cropData: { [key: string]: {[key: string]: number}} = {
    'alfalfa': { 'Seedling': 0.4, 'Adult': 1.2, 'Elderly': 1.15 },
    'onions': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.95 },
    'apples': { 'Seedling': 0.5, 'Adult': 1.2, 'Elderly': 0.85 },
    'pasture': { 'Seedling': 0.4, 'Adult': 1, 'Elderly': 0.85 },
    'apricots': { 'Seedling': 0.45, 'Adult': 1.15, 'Elderly': 0.85 },
    'peaches': { 'Seedling': 0.45, 'Adult': 1.15, 'Elderly': 0.85 },
    'beansGreen': { 'Seedling': 0.5, 'Adult': 1.05, 'Elderly': 0.9 },
    'pears': { 'Seedling': 0.5, 'Adult': 1.2, 'Elderly': 0.85 },
    'beets': { 'Seedling': 0.5, 'Adult': 1.05, 'Elderly': 0.95 },
    'peas': { 'Seedling': 0.5, 'Adult': 1.15, 'Elderly': 1.1 },
    'berriesBushes': { 'Seedling': 0.3, 'Adult': 1.05, 'Elderly': 0.5 },
    'potato': { 'Seedling': 0.5, 'Adult': 1.15, 'Elderly': 0.75 },
    'broccoli': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.95 },
    'pumpkin': { 'Seedling': 0.5, 'Adult': 1, 'Elderly': 0.8 },
    'cabbage': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.95 },
    'radish': { 'Seedling': 0.7, 'Adult': 0.9, 'Elderly': 0.85 },
    'cabbageLocal': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.95 },
    'smallVegetables': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.95 },
    'carrots': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.95 },
    'spinach': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.95 },
    'cauliflower': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.95 },
    'squash': { 'Seedling': 0.5, 'Adult': 0.95, 'Elderly': 0.75 },
    'celery': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.95 },
    'stoneFruits': { 'Seedling': 0.45, 'Adult': 1.15, 'Elderly': 0.85 },
    'cereal': { 'Seedling': 0.3, 'Adult': 1.15, 'Elderly': 0.25 },
    'sweetCorn': { 'Seedling': 0.3, 'Adult': 1.15, 'Elderly': 0.4 },
    'cherries': { 'Seedling': 0.5, 'Adult': 1.2, 'Elderly': 0.85 },
    'sweetPeppers': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.85 },
    'cucumber': { 'Seedling': 0.6, 'Adult': 1, 'Elderly': 0.75 },
    'tomato': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.8 },
    'grapes': { 'Seedling': 0.3, 'Adult': 0.8, 'Elderly': 0.5 },
    'tubers': { 'Seedling': 0.5, 'Adult': 1.05, 'Elderly': 0.95 },
    'greenOnions': { 'Seedling': 0.7, 'Adult': 1.05, 'Elderly': 0.95 },
    'watermelon': { 'Seedling': 0.4, 'Adult': 1, 'Elderly': 0.75 },
    'lettuce': { 'Seedling': 0.7, 'Adult': 1, 'Elderly': 0.95 }
};