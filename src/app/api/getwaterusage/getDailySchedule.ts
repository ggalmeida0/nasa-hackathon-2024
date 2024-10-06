const roundToNearestQuarter = (num: number): number => {
    return Math.round(num * 4) / 4;
}
function addTimeToStartTime(hoursToAdd: number): string {
    const startTime = '22:00';
    let [hours, minutes] = startTime.split(':').map(Number);
    
    // Add the whole hours
    hours += Math.floor(hoursToAdd);
    
    // Add the fractional part as minutes
    minutes += Math.round((hoursToAdd % 1) * 60); // Convert fractional hours to minutes
    
    // Normalize minutes and adjust hours if needed
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
    }
    
    // Normalize hours to 24-hour format
    hours = hours % 24;

    // Format the hours and minutes to ensure two digits
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}

export const getDailySchedule = (waterUsage: number[], flowRate: number): string[] => {
    const GAL_TO_LIT = 3.78541;
    const flowRateLPH = flowRate * 60 * GAL_TO_LIT;
    const dailyHours = waterUsage.map((dailyUsage: number) => roundToNearestQuarter(dailyUsage / flowRateLPH));
    const timeToStart = dailyHours.map((hours: number) => addTimeToStartTime(hours));
    return timeToStart;

}