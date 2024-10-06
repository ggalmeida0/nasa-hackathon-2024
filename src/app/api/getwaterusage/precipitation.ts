import { LatLng } from './util';

const wrapper = async (coord: LatLng, startDate: string, endDate: string): Promise<number[]> => {
  // API URL and parameters for Open-Meteo API
  const url = 'https://api.open-meteo.com/v1/forecast';
  const params = {
    latitude: coord.Longitude,
    longitude: coord.Latitude,
    daily: 'precipitation_sum',
    start_date: startDate,
    end_date: endDate,
    timezone: 'auto',
  };
  console.log(coord);
  // Fetch data from the Open-Meteo API
  const response = await fetch(
    `${url}?latitude=${params.latitude}&longitude=${params.longitude}&daily=${params.daily}&start_date=${params.start_date}&end_date=${params.end_date}&timezone=${params.timezone}`,
  );
  const data = await response.json();

  // // // Extract daily precipitation data
  const daily = data.daily;
  const daily_precipitation = daily.precipitation_sum; // Array of precipitation sums for each day

  return daily_precipitation;
};

export const getPrecipitation = async (coord: LatLng, startDate: string, endDate: string) => {
  const value = await wrapper(coord, startDate, endDate);
  return value;
};
