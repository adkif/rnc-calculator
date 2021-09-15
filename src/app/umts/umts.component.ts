import { Component, OnInit } from '@angular/core';
import { DownLink } from '../classes/down-link';
import { Service } from '../classes/service';
import { UpLink } from '../classes/up-link';
import { IAntenna } from '../interfaces/iantenna';
import { ICharacteristic } from '../interfaces/icharacteristic';

@Component({
  selector: 'app-umts',
  templateUrl: './umts.component.html',
  styleUrls: ['./umts.component.scss']
})
export class UmtsComponent implements OnInit {
  chargeFactor = 50;
  interferenceFactor = 0.65;
  area: number = 40.8;
  antenna: IAntenna = {
    frequency: 1,
    sector: 3,
  };
  hEff = 30;
  services: Service[] = [];
  servicesDl: Service[] = [];
  chipRate = 3840;
  maximalPower= 13;
  orthogonalityFactor = 0.6;
  densityPowerNoise = 169;
  ps64_384: ICharacteristic =  {
    dataRate : 64,
    signalOverNoise: 1.6,
    activityFactor: 1,
    predictTrafic : 2,
    maximumAttenuationPropagation : 122.74
  }

  ps64_128: ICharacteristic =  {
    dataRate : 64,
    signalOverNoise: 1.6,
    activityFactor: 1,
    predictTrafic : 5,
    maximumAttenuationPropagation : 122.74
  }

  ps64_64: ICharacteristic =  {
    dataRate : 64,
    signalOverNoise: 1.6,
    activityFactor: 1,
    predictTrafic : 100,
    maximumAttenuationPropagation : 122.74
  }

  cs64: ICharacteristic =  {
    dataRate : 64,
    signalOverNoise: 2.87,
    activityFactor: 1,
    predictTrafic : 400,
    maximumAttenuationPropagation : 121.47
  }

  voice: ICharacteristic =  {
    dataRate : 12.2,
    signalOverNoise: 4.2,
    activityFactor: 0.67,
    predictTrafic : 3000,
    maximumAttenuationPropagation : 125.34
  }

  erlangsCellTrafic!: number;


  // Downlink

  ps64_384_dl: ICharacteristic =  {
    dataRate : 384,
    signalOverNoise: 8,
    activityFactor: 1,
    predictTrafic : 20,
    maximumAttenuationPropagation : 122.74
  }

  ps64_128_dl: ICharacteristic =  {
    dataRate : 128,
    signalOverNoise: 6.4,
    activityFactor: 1,
    predictTrafic : 35,
    maximumAttenuationPropagation : 122.74
  }

  ps64_64_dl: ICharacteristic =  {
    dataRate : 64,
    signalOverNoise: 7.4,
    activityFactor: 1,
    predictTrafic : 100,
    maximumAttenuationPropagation : 122.74
  }

  cs64_dl: ICharacteristic =  {
    dataRate : 64,
    signalOverNoise: 7.7,
    activityFactor: 1,
    predictTrafic : 400,
    maximumAttenuationPropagation : 121.47
  }

  voice_dl: ICharacteristic =  {
    dataRate : 12.2,
    signalOverNoise: 7.7,
    activityFactor: 0.58,
    predictTrafic : 3000,
    maximumAttenuationPropagation : 125.34
  }

  uplink!: UpLink;

  constructor() { }

  ngOnInit(): void {
    this.services.push(new Service("voice",this.voice));
    this.services.push(new Service("cs64",this.cs64));
    this.services.push(new Service("ps64_64",this.ps64_64));
    this.services.push(new Service("ps64_128",this.ps64_128));
    this.services.push(new Service("ps64_384",this.ps64_384));

    this.servicesDl.push(new Service("voice",this.voice_dl));
    this.servicesDl.push(new Service("cs64",this.cs64_dl));
    this.servicesDl.push(new Service("ps64_64",this.ps64_64_dl));
    this.servicesDl.push(new Service("ps64_128",this.ps64_128_dl));
    this.servicesDl.push(new Service("ps64_384",this.ps64_384_dl));
  }

  compute(){
    let downlink = new DownLink(this.area,this.hEff, this.chargeFactor, this.interferenceFactor, this.antenna, this.servicesDl, this.chipRate,this.maximalPower,this.orthogonalityFactor, this.densityPowerNoise);

    downlink.lastBss+= 20;
    console.log(downlink.lastBss);
    console.log(downlink.virtualTrafic());
    console.log(downlink.lastBss);
    console.log(downlink.channelProvided(6));
    console.log(downlink.channelCapableProvided());
  }

  computeUpLink(){
    this.uplink = new UpLink(this.area,this.hEff, this.chargeFactor, this.interferenceFactor, this.antenna, this.services, this.chipRate);
  }

}
