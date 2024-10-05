// app/api/hello/route.js
import { SphericalUtil, LatLng } from "./util"


const getArea = (geometry: LatLng[]) => {
  const area = SphericalUtil.computeSignedArea(geometry);
  console.log(area);
};

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // [-0.042057, 51.530212][-0.015106, 51.512268] [-0.078793, 51.512909] [-0.069008, 51.53726]

  const geometry : string = searchParams.get('geometry');
  const startdate : string = searchParams.get('startdate');
  const enddate : string = searchParams.get('enddate');
  const interval : string = searchParams.get('interval');

  const geometryET = JSON.parse(geometry);
  const latLngArray: LatLng[] = geometryET.map(([lat, lng]) => ({
    Latitude: lat,
    Longitude: lng
  }));

  console.log(latLngArray);
  getArea(latLngArray);


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

