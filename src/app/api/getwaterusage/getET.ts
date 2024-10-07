import { LatLng } from './util';

const wrapper = async (startdate: string, enddate: string, geometryET: LatLng[]): Promise<number[]> => {
  const reversedCoords = geometryET.map((pts) => [pts.Latitude, pts.Longitude]).flat();
  console.log(reversedCoords);
  const response = await fetch('https://openet-api.org/raster/timeseries/polygon', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.ET_API_KEY as string,
    },

    body: JSON.stringify({
      date_range: [startdate, enddate],
      file_format: 'JSON',
      geometry: reversedCoords,
      interval: 'daily',
      model: 'SSEBop',
      reducer: 'mean',
      reference_et: 'gridMET',
      units: 'mm',
      variable: 'ET',
    }),
  });
  const data = await response.json();
  console.log(data);
  // Convert to an array of et numbers
  const etArray = data.map((entry: { et: any }) => entry.et);

  return etArray;
};

export const getET = async (startdate: string, enddate: string, geometryET: LatLng[]) => {
  const data = await wrapper(startdate, enddate, geometryET);
  return data;
};
