import { IAntenna } from "../interfaces/iantenna";
import { Service } from "./service";
import { UpLink } from "./up-link";
import { IAmplitude } from "../interfaces/iamplitude";

export class DownLink extends UpLink {
  lastBss: number;
  maximalPower: number;
  orthogonalityFactor: number;
  densityPowerNoise: number;
  constructor(area: number, hEff: number, chargeFactor: number, interferenceFactor: number, antenna: IAntenna, services: Service[], chipRate: number,maximalPower: number,orthogonalityFactor:number, densityPowerNoise: number) {
    super(area, hEff, chargeFactor, interferenceFactor, antenna, services, chipRate);
    this.lastBss = this.bss();
    this.maximalPower = maximalPower;
    this.orthogonalityFactor = orthogonalityFactor;
    this.densityPowerNoise = densityPowerNoise;
  }
  capacityFactor = () => {
    return this.variance() / this.mean();
  }
  meansTrafic = () => {
    let means: IAmplitude[] = [];
    for (let service of this.services) {
      means.push({ service: service, value: (service.characteristic.predictTrafic / this.lastBss / this.antenna.sector) });
    }
    return means;
  }
  mean = () => {
    let mean: number = 0;
    let amplitudes = this.relativeAmplitudes();
    let meansTrafic = this.meansTrafic();
    for (let amplitude of amplitudes) {
      for (let meanTrafic of meansTrafic) {
        if (meanTrafic.service.name === amplitude.service.name) {
          mean += amplitude.value * meanTrafic.value;
        }
      }
    }
    return mean;
  };

  variance = () => {
    let variance: number = 0;
    let meansTrafic = this.meansTrafic();
    let amplitudes = this.relativeAmplitudes();
    for (let amplitude of amplitudes) {
      for (let meanTrafic of meansTrafic) {
        if (meanTrafic.service.name === amplitude.service.name) {
          variance += Math.pow(amplitude.value, 2) * meanTrafic.value;
        }
      }
    }
    return variance;
  };

  channelProvided = (capacity: number) => {
    let amplitudes = this.relativeAmplitudes();
    let channel = 0;
    for (let amplitude of amplitudes) {
      if (amplitude.service.name === 'voice') {
        channel = capacity * this.capacityFactor() + amplitude.value;
      }
    }
    return channel;
  }

  channelCapableProvided = () => {
    let channel = 0;
    for (let service of this.services) {
      if (service.name === 'voice') {
        let x = (service.characteristic.activityFactor*Math.pow(10, service.characteristic.signalOverNoise/10))/(this.chipRate/service.characteristic.dataRate);
        let y = 1-this.orthogonalityFactor+this.interferenceFactor;
        channel = 1/(x *(this.densityPowerNoise*(service.characteristic.maximumAttenuationPropagation - 6)/Math.pow(10, this.maximalPower*1000)+y));
      }
    }
    return channel;
  }
}
