export type LatLng = { Latitude: number; Longitude: number };

const toRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180);
}

export const calculateArea = (latLngs: LatLng[]): number => {
    let area = 0;

    const n = latLngs.length;
    for (let i = 0; i < n - 1; i++) {
        const j = (i + 1) % n; // Next vertex index, wrapping around
        const lat1 = toRadians(latLngs[i].Latitude);
        const lat2 = toRadians(latLngs[j].Latitude);
        const lng1 = toRadians(latLngs[i].Longitude);
        const lng2 = toRadians(latLngs[j].Longitude);

        // Using the Shoelace formula
        area += lng1 * lat2 - lng2 * lat1;
    }

    area = Math.abs(area) / 2;

    // Convert area from degrees^2 to square meters
    // Earth's radius in meters (mean radius)
    const earthRadius = 6378137; // in meters
    const conversionFactor = Math.PI / 180; // degrees to radians conversion
    area = area * (earthRadius ** 2) * conversionFactor ** 2; // convert to m²

    return area;
}