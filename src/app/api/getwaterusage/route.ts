// app/api/hello/route.js
import { calculateArea, LatLng } from './util';
import { getPrecipitation } from './precipitation';
import { getWaterRequirement } from './getWaterUsage';
import { getET } from './getET';
import { getDailySchedule } from './getDailySchedule';

const getCenter = (geometry: LatLng[]) => {
  let sumLat = 0;
  let sumLong = 0;

  for (const latLng of geometry) {
    sumLat += latLng.Latitude;
    sumLong += latLng.Longitude;
  }

  return { Latitude: sumLat / geometry.length, Longitude: sumLong / geometry.length };
};

const addDaysToDate = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(request: any) {
  const { searchParams } = new URL(request.url);

  const geometry: string = searchParams.get('geometry')!;
  const flowRate: number = parseFloat(searchParams.get('flowrate')!);
  const cropType: string = searchParams.get('croptype')!;
  const growthStage: string = searchParams.get('growthstage')!;

  const today = new Date();
  const startingDate = addDaysToDate(today, -7);
  const endingDate = addDaysToDate(today, 7); // Adds 7 days to today's date

  const startDatePrecip = today.toISOString().split('T')[0];
  const endDatePrecip = endingDate.toISOString().split('T')[0];

  const endDateET = addDaysToDate(today, -1).toISOString().split('T')[0];
  const startDateET = startingDate.toISOString().split('T')[0];

  const geometryET = JSON.parse(geometry);
  const latLngArray: LatLng[] = geometryET.map(([lat, lng]: [number, number]) => ({
    Latitude: lat,
    Longitude: lng,
  }));

  const center: LatLng = getCenter(latLngArray);
  const area = calculateArea(latLngArray);
  const ET = await getET(startDateET, endDateET, latLngArray);
  const precipitation = await getPrecipitation(center, startDatePrecip, endDatePrecip);
  const waterRequirements = getWaterRequirement(ET, cropType, growthStage, area, center, precipitation);
  const timeToStart = getDailySchedule(waterRequirements, flowRate);

  return new Response(JSON.stringify({ waterUsage: waterRequirements, timeToEnd: timeToStart }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
