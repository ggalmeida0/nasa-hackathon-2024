// app/api/hello/route.js
export async function GET(request) {
  const response = await fetch('https://openet-api.org/raster/timeseries/polygon', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "pegB8xzf2qLW1l8L5lq8kqUow4GN4ujvMOtGKPZ2jLkWgk8KIpNfTzlLt8mP"
    },
    body: JSON.stringify({
      "date_range": [
        "2020-01-01",
        "2020-01-10"
      ],
      "file_format": "JSON",
      "geometry": [
        -119.7937,
        35.58995,
        -119.7937,
        35.53326,
        -119.71268,
        35.53326,
        -119.71268,
        35.58995
      ],
      "interval": "daily",
      "model": "SSEBop",
      "reducer": "mean",
      "reference_et": "gridMET",
      "units": "mm",
      "variable": "ET"
    }),
  });
  const data = await response.json();

  console.log(data);

  return new Response(JSON.stringify({ message: 'Hello, world!' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

