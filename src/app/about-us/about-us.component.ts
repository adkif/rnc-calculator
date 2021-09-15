import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  team = [
    {name: "Adolphe Kifungo", sprite: "male"},
    {name: "Vianney Hekima", sprite: "male"},
    {name: "Joëlle Zawadi", sprite: "female"},
    {name: "Abija Musavuli", sprite: "male"},
    {name: "David Tsongo", sprite: "male"}
  ]
  director = {
    name:"Ph.D Olivier Mushage",
    sprite:"male"
  }
  constructor() { }

  ngOnInit(): void {
  }

}
