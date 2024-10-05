export type LatLng = { Latitude: number; Longitude: number };

export class SphericalUtil {
    private static readonly EARTH_RADIUS: number = 6371009;

    private static toRadians(input: number): number {
        return input / 180.0 * Math.PI;
    }

    public static computeSignedArea(path: LatLng[]): number {
        return this.computeSignedAreaWithRadius(path, this.EARTH_RADIUS);
    }

    private static computeSignedAreaWithRadius(path: LatLng[], radius: number): number {
        const size = path.length;
        if (size < 3) { return 0; }

        let total = 0;
        const prev = path[size - 1];
        let prevTanLat = Math.tan((Math.PI / 2 - this.toRadians(prev.Latitude)) / 2);
        let prevLng = this.toRadians(prev.Longitude);

        for (const point of path) {
            const tanLat = Math.tan((Math.PI / 2 - this.toRadians(point.Latitude)) / 2);
            const lng = this.toRadians(point.Longitude);

            total += this.polarTriangleArea(tanLat, lng, prevTanLat, prevLng);
            prevTanLat = tanLat;
            prevLng = lng;
        }
        return total * (radius * radius);
    }

    private static polarTriangleArea(tan1: number, lng1: number, tan2: number, lng2: number): number {
        const deltaLng = lng1 - lng2;
        const t = tan1 * tan2;
        return 2 * Math.atan2(t * Math.sin(deltaLng), 1 + t * Math.cos(deltaLng));
    }
}

type CropKc = {
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