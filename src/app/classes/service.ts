import { IEmeteurService } from "../interfaces/iemeteurservice";
import { IOtherService } from "../interfaces/iotherservice";
import { IRecepteurService } from "../interfaces/irecepteurservice";
import { ICharacteristic } from "../interfaces/icharacteristic";

export class Service {
  name: string;
  characteristic: ICharacteristic;
  constructor( name: string, characteristic: ICharacteristic){
    this.characteristic = characteristic;
    this.name = name;
  }
  range = (hEff: number) => {
    let k1 = 152.4, k2 = 44.6, k5 = -13.82,k6 = -6.55;
    return Math.pow(10, (this.characteristic.maximumAttenuationPropagation - k1- k5* Math.log10(hEff))/(k2+k6*Math.log10(hEff)));
  }
}
