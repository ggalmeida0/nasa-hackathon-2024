import { cropData } from '../../croptable';
import { LatLng } from './util';

export function getWaterRequirement(
  ET: number[],
  cropType: string,
  growthStage: string,
  area: number,
  center: LatLng,
  precipitation: number[],
): number[] {
  // Get the crop coefficient
  console.log('GETTING CROP');
  const cropKc: number = cropData[cropType][growthStage];
  console.log(cropKc);
  // Calculate the water requirement for each day
  const waterRequirement: number[] = [];

  for (let i = 0; i < 7; i++) {
    const dailyRequirement = Math.ceil((cropKc * ET[i] - precipitation[i]) * area); // Calculate daily water requirement
    waterRequirement.push(dailyRequirement); // Use push instead of append
  }

  return waterRequirement;
}
