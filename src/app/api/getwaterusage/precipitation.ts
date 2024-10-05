import { LatLng } from "./util"

async function getPrecipitation(coord: LatLng): Promise<number[]> {

        // // Define current date and the next 7 days
        const today = new Date();
        const endDate = addDays(today, 7); // Adds 7 days to today's date

        // Format the dates to 'yyyy-MM-dd' as required by the API
        const startDateStr = format(today, 'yyyy-MM-dd');
        const endDateStr = format(endDate, 'yyyy-MM-dd');

        // API URL and parameters for Open-Meteo API
        const url = "https://api.open-meteo.com/v1/forecast";
        const params = {
            latitude: coord.Latitude,
            longitude: coord.Longitude, 
            daily: "precipitation_sum",
            start_date: startDateStr,
            end_date: endDateStr,
            timezone: "auto" 
        };

        // Fetch data from the Open-Meteo API
        const response = await fetch(`${url}?latitude=${params.latitude}&longitude=${params.longitude}&daily=${params.daily}&start_date=${params.start_date}&end_date=${params.end_date}&timezone=${params.timezone}`);
        const data = await response.json();

        // Extract daily precipitation data
        const daily = data.daily;
        const daily_precipitation = daily.precipitation_sum; // Array of precipitation sums for each day

        return daily_precipitation
} 

console.log(getPrecipitation({ Latitude: 37.7749, Longitude: -122.4194}));
