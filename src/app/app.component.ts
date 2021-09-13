import { Component } from '@angular/core';
import { IAntenna } from './interfaces/iantenna';
import { IRnc } from './interfaces/irnc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rncCalculator';
  coverage: number = 0;
  distanceBetweenNode: number = 0;
  range: number = 0;
  baseStation: number = 0;
  rnc: IRnc = {
    cells: 0,
    baseStation: 0,
    rate: 0,
  };
  antenna: IAntenna = {
    frequency: 0,
    sector: 0,
  };
  area: number = 0;
  loss: any = 0;
  margin1  = 100;
  margin2 = 100;
  fillrate = 100;
  voiceErl = 0
  bitRateVoice = 0;
  shoVoice = 0;
  csDataErl = 0;
  bitRateCsData=0;
  shoCsData = 0;
  csDataErl2 = 0;
  bitRateCsData2=0;
  shoCsData2 = 0;
  avePsDataErl = 0;
  psOverhead = 1;
  shoPsData = 0;
  subscribers = 0;
  numBs = 0;
  rncs: number[] = [];
  numRNCs = () => {
    this.range = Math.pow(10, (this.loss - 137.4) / 35.2);
    this.compute();
    this.numBs = Math.ceil(this.area / this.coverage);
    this.rncs.push(Math.ceil((Math.ceil(this.numBs) * this.antenna.frequency * this.antenna.sector)/(this.rnc.cells * this.margin1/100)))
    this.rncs.push(Math.ceil(Math.ceil(this.numBs)/(this.rnc.baseStation * this.margin2/100)));
    this.rncs.push(Math.ceil((this.voiceTP()+ this.csDataTp()+ this.csDataTp2()+this.PsDataTp())*this.subscribers/(this.fillrate* this.rnc.rate*10)))
    return Math.max(...this.rncs);
  };

  ngOnInit(): void {
  }

  onClick() {
  }

  PsDataTp() {
    console.log(this.avePsDataErl * 100 / this.psOverhead * (1+this.shoPsData/100));
    return this.avePsDataErl * 100 / this.psOverhead * (1+this.shoPsData/100);
  }
  csDataTp() {
    console.log(this.csDataErl * this.bitRateCsData * (1+this.shoCsData/100));

    return this.csDataErl * this.bitRateCsData * (1+this.shoCsData/100);
  }
  csDataTp2() {
    console.log(this.csDataErl2 * this.bitRateCsData2 * (1+this.shoCsData2/100));

    return this.csDataErl2 * this.bitRateCsData2 * (1+this.shoCsData2/100);
  }
  voiceTP() {
    console.log(this.voiceErl * this.bitRateVoice * (1+this.shoVoice/100));

    return this.voiceErl * this.bitRateVoice * (1+this.shoVoice/100);
  }

  compute() {
    switch (this.antenna.sector) {
      case 1:
        this.coverage = 2.6 * Math.pow(this.range, 2);
        this.distanceBetweenNode = 0.87 * this.range;
        break;
      case 2:
        this.coverage = 1.3 * Math.pow(this.range, 2);
        this.distanceBetweenNode = 2 * this.range;
        break;
      case 3:
        this.coverage = 1.95 * Math.pow(this.range, 2);
        this.distanceBetweenNode = 1.5 * this.range;
        break;
      case 6:
        this.coverage = 2.6 * Math.pow(this.range, 2);
        this.distanceBetweenNode = 0.87 * this.range;
        break;
      default:
        console.log('Error: ' + this.antenna.sector);
    }
  }
}
