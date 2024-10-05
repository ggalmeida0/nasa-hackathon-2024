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