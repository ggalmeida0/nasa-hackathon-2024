// app/api/hello/route.js
import { SphericalUtil, LatLng } from "./util"
import { getPrecipitation } from "./precipitation";

const getArea = (geometry: LatLng[]) => {
  const area = SphericalUtil.computeSignedArea(geometry);
  console.log(area);
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

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const geometry : string = searchParams.get('geometry');
  const startdate : string = searchParams.get('startdate');
  const enddate : string = searchParams.get('enddate');
  const interval : string = searchParams.get('interval');

  const geometryET = JSON.parse(geometry);
  const latLngArray: LatLng[] = geometryET.map(([lat, lng]) => ({
    Latitude: lat,
    Longitude: lng
  }));

  const center: LatLng = getCenter(latLngArray);
  console.log(getPrecipitation(center));

  // console.log(latLngArray);
  // getArea(latLngArray);

  // const response = await fetch('https://openet-api.org/raster/timeseries/polygon', {
  //   method: 'POST',
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Authorization": "pegB8xzf2qLW1l8L5lq8kqUow4GN4ujvMOtGKPZ2jLkWgk8KIpNfTzlLt8mP"
  //   },

  //   body: JSON.stringify({
  //     "date_range": [
  //       startdate,
  //       enddate
  //     ],
  //     "file_format": "JSON",
  //     "geometry": geometryET,
  //     "interval": interval,
  //     "model": "SSEBop",
  //     "reducer": "mean",
  //     "reference_et": "gridMET",
  //     "units": "mm",
  //     "variable": "ET"
  //   }),
  // });
  // const data = await response.json();

  // return new Response(JSON.stringify({ et_data: data }), {
  //   status: 200,
  //   headers: { 'Content-Type': 'application/json' },
  // });
  return new Response(JSON.stringify({ et_data: "data" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

