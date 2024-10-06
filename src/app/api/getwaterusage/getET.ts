import { LatLng } from "./util";

const wrapper = async (startdate: string, enddate: string, geometryET: LatLng[]): Promise<number[]> => {  
  const response = await fetch('https://openet-api.org/raster/timeseries/polygon', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "pegB8xzf2qLW1l8L5lq8kqUow4GN4ujvMOtGKPZ2jLkWgk8KIpNfTzlLt8mP"
    },

    body: JSON.stringify({
      "date_range": [
        startdate,
        enddate
      ],
      "file_format": "JSON",
      "geometry": geometryET,
      "interval": "daily",
      "model": "SSEBop",
      "reducer": "mean",
      "reference_et": "gridMET",
      "units": "mm",
      "variable": "ET"
    }),
  });
  const data = await response.json();

  // Convert to an array of et numbers
  const etArray = data.map((entry: { et: any; }) => entry.et);

  return etArray;
}

export const getET = async (startdate: string, enddate: string, geometryET: LatLng[]) => {
    const data = await wrapper(startdate, enddate, geometryET);
    return data;
}