import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {

  latitude: number;
  longitude:number;
  lat: number = 34.084745;
  lng: number = 74.797019;

  getCoords(event){
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;

  } 

  constructor() { }

  ngOnInit() {
  }

}
