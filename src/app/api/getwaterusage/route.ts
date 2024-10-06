// app/api/hello/route.js
import { SphericalUtil, LatLng } from "./util"
import { getPrecipitation } from "./precipitation";
import { getWaterRequirement } from "./getWaterUsage";
import { getET } from "./getET";

const getArea = (geometry: LatLng[]) => {
  return SphericalUtil.computeSignedArea(geometry);
};

const getCenter = (geometry: LatLng[]) => {
  let sumLat = 0;
  let sumLong = 0;

  for (const latLng of geometry) {
    sumLat += latLng.Latitude;
    sumLong += latLng.Longitude;
  }

  return { Latitude: sumLat / geometry.length, Longitude: sumLong / geometry.length };
}

const addDaysToDate = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const geometry : string = searchParams.get('geometry')!;
  // const cropType = searchParams.get('cropType');
  // const growthStage = searchParams.get('growthStage');

  // // Define current date and the next 7 days
  const today = new Date();
  const startingDate = addDaysToDate(today, -7);
  const endingDate = addDaysToDate(today, 7); // Adds 7 days to today's date

  // Format the dates to 'yyyy-MM-dd' as required by the API
  const startDatePrecip = today.toISOString().split('T')[0];
  const endDatePrecip = endingDate.toISOString().split('T')[0];

  // Format the dates to 'yyyy-MM-dd' as required by the API
  const endDateET = addDaysToDate(today, -1).toISOString().split('T')[0];
  const startDateET = startingDate.toISOString().split('T')[0];

  const geometryET = JSON.parse(geometry);
  const latLngArray: LatLng[] = geometryET.map(([lat, lng]: [number, number]) => ({
    Latitude: lat,
    Longitude: lng
  }));

  const center: LatLng = getCenter(latLngArray);
  const area = getArea(latLngArray);
  const ET = await getET(startDateET, endDateET, geometryET.flat());
  const precipitation = await getPrecipitation(center, startDatePrecip, endDatePrecip);
  const cropType = 'alfalfa';
  const growthStage = 'Adult';

  return new Response(JSON.stringify({ waterUsage: getWaterRequirement(ET, cropType, growthStage, area, center, precipitation) }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

