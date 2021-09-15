import { IAmplitude } from '../interfaces/iamplitude';
import { IAntenna } from '../interfaces/iantenna';
import { Service } from './service';

export class UpLink {
  area: number;
  antenna: IAntenna;
  chargeFactor:number;
  interferenceFactor:number;
  services: Service[] = [];
  hEff: number;
  chipRate: number;
  constructor(area: number, hEff: number, chargeFactor:number, interferenceFactor:number, antenna: IAntenna, services: Service[], chipRate: number) {
    this.services = services;
    this.antenna = antenna;
    this.area = area;
    this.interferenceFactor = interferenceFactor;
    this.chargeFactor = chargeFactor;
    this.hEff = hEff;
    this.chipRate = chipRate;
  }

  bss = () => {
    return Math.ceil(this.area / this.coverage());
  };

  minRange = () => {
      let minRange = Math.pow(10, 10);
      for (let service of this.services) {
        let range = service.range(this.hEff)
        if (range < minRange) {
          minRange = range;
        }
      }
      return minRange;
    };

  coverage = () => {
    let coverage = 0;
    let range = this.minRange();
    switch (this.antenna.sector) {
      case 1:
        coverage = 2.6 * Math.pow(range, 2);
        break;
      case 2:
        coverage = 1.3 * Math.pow(range, 2);
        break;
      case 3:
        coverage = 1.95 * Math.pow(range, 2);
        break;
      case 6:
        coverage = 2.6 * Math.pow(range, 2);
        break;
      default:
        console.log('Error: ' + this.antenna.sector);
    }
    return coverage;
  };

  relativeAmplitudes = () => {
    let amplitudes: IAmplitude[] = [];
    let denominator = 1;

    for (let service of this.services) {
      if (service.name === 'voice') {
        denominator =
          service.characteristic.dataRate * Math.pow(10, service.characteristic.signalOverNoise/10) * service.characteristic.activityFactor;
      }
    }

    for (let service of this.services) {
      amplitudes.push({
        service: service,
        value:
          (service.characteristic.dataRate * Math.pow(10, service.characteristic.signalOverNoise/10) * service.characteristic.activityFactor) /denominator
      });
    }

    return amplitudes;
  };

  mean = () => {
    let mean: number = 0;
    let amplitudes = this.relativeAmplitudes();
    for (let amplitude of amplitudes) {
      mean += amplitude.value * amplitude.service.characteristic.predictTrafic;
    }
    return mean;
  };

  variance = () => {
    let variance: number = 0;
    let amplitudes = this.relativeAmplitudes();
    for (let amplitude of amplitudes) {
      variance += Math.pow(amplitude.value,2)* amplitude.service.characteristic.predictTrafic
    }
    return variance;
  };

  capacityFactor = () => {
    return this.variance()/this.mean();
  }

  virtualTrafic = () => {
    return this.mean()/this.capacityFactor();
  }

  lines = () => {
    let lines = 0;
    for(let service of this.services){
      if(service.name === 'voice'){
       lines =  this.chargeFactor/100 * (1+ this.chipRate/ service.characteristic.dataRate*1/service.characteristic.activityFactor*1/Math.pow(10, service.characteristic.signalOverNoise/10))/(1+this.interferenceFactor);
      }
    }
    return lines;
  }

  cellCapacity = () => {
    let capacity = 0;
    let amplitudes = this.relativeAmplitudes();
    let lines = this.lines();
    for(let amplitude of amplitudes){
      if(amplitude.service.name === 'voice'){
        console.log(lines);
        capacity = (lines - amplitude.value)/this.capacityFactor();
      }
    }
    return capacity;
  }

  cells= (erlangsCellTrafic: number)=>{
    return this.virtualTrafic()/erlangsCellTrafic;
  }

  bssCells = (hbt: number) =>{
    return this.cells(hbt)/this.antenna.sector/this.antenna.frequency
  }

  bestBss = (hbt: number) => {
    return Math.max(...[this.bssCells(hbt),this.bss()])
  }
}
