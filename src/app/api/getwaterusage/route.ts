// app/api/hello/route.js
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const geometry : string = searchParams.get('geometry');
  const startdate : string = searchParams.get('startdate');
  const enddate : string = searchParams.get('enddate');
  const interval : string = searchParams.get('interval');

  const geometryET = JSON.parse(geometry).flat();

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
      "interval": interval,
      "model": "SSEBop",
      "reducer": "mean",
      "reference_et": "gridMET",
      "units": "mm",
      "variable": "ET"
    }),
  });
  const data = await response.json();

  return new Response(JSON.stringify({ et_data: data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
  // return new Response(JSON.stringify({ et_data: "hello" }), {
  //   status: 200,
  //   headers: { 'Content-Type': 'application/json' },
  // });
}

