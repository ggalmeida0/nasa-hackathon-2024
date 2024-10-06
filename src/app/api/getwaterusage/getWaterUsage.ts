import { getPrecipitation } from "./precipitation";
import { cropData } from "../../croptable";
import { LatLng } from "./util";

export async function getWaterRequirement(ET: number[], cropType: string, growthStage: string, area: number, center: LatLng): number[] {
    // Get the crop coefficient
    const cropKc : number = cropData[cropType][growthStage];

    // Get the precipitation data
    const precipitation = await getPrecipitation(center);

    // Calculate the water requirement for each day
    const waterRequirement: number[] = [];

    for (let i = 0; i < 7; i++) {
        const dailyRequirement = (cropKc * ET[i]) - precipitation[i]; // Calculate daily water requirement
        waterRequirement.push(dailyRequirement); // Use push instead of append
    }

    return waterRequirement;
}
