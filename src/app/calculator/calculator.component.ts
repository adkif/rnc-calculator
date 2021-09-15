import { Component, OnInit } from '@angular/core';
import { IAntenna } from '../interfaces/iantenna';
import { IRnc } from '../interfaces/irnc';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  constructor() { }


  coverage: number = 0;
  distanceBetweenNode: number = 0;
  range: number = 0;
  baseStation: number = 0;
  rnc: IRnc = {
    cells: 1152,
    baseStation: 384,
    rate: 196,
  };
  antenna: IAntenna = {
    frequency: 2,
    sector: 3,
  };
  area: number = 40;
  loss = 120;
  margin1  = 90;
  margin2 = 92;
  fillrate = 90;
  voiceErl = 0.025
  bitRateVoice = 16;
  shoVoice = 30;
  csDataErl = 0.01;
  bitRateCsData=32;
  shoCsData = 30;
  csDataErl2 = 0.005;
  bitRateCsData2=64;
  shoCsData2 = 30;
  avePsDataErl = 0.2;
  psOverhead = 15;
  shoPsData = 30;
  subscribers = 350000;
  numBs = 0;
  numRNCs = () => {
    let rncs: number[] = [];
    this.range = Math.pow(10, (this.loss - 137.4) / 35.2);
    this.compute();
    this.numBs = Math.ceil(this.area / this.coverage);
    rncs.push(Math.ceil((Math.ceil(this.numBs) * this.antenna.frequency * this.antenna.sector)/(this.rnc.cells * this.margin1/100)))
    rncs.push(Math.ceil(Math.ceil(this.numBs)/(this.rnc.baseStation * this.margin2/100)));
    rncs.push(Math.ceil((this.voiceTP()+ this.csDataTp()+ this.csDataTp2()+this.PsDataTp())*this.subscribers/(this.fillrate* this.rnc.rate*10)))
    return [rncs, Math.max(...rncs)];
  };

  ngOnInit(): void {
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
