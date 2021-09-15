export interface IRecepteurService {
  spectralDensityThermalNoise: number;
  thermalNoisePower: number;
  noiseCoefficient: number;
  noise: number;
  interferenceMargin: number;
  Sensitivity: number;
  antennaGain:number;
  lineLoss: number;
  rateData: number;
  signalOverNoise: number;
  calculationGain: number;
}
