import { Component, OnInit } from '@angular/core';
import { PassengersService } from '../passengers/services/passengers.service';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { RoutesService } from '../../buses-dashboard/routes/services/routes.service';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  bus_no: Number;
  stops: string;
  latLngs: number;
  stopForm:FormGroup;
  latitude: number;
  longitude: number;
  lat: Number = 34.084745;
  lng: Number = 74.797019;

  getCoords(event) {
    console.log(event);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;

  }

  constructor(protected routesSer: RoutesService, protected ar: ActivatedRoute,protected router:Router) { }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    this.bus_no = this.ar.snapshot.queryParams.busno;
    this.getRoutes();
    this.stopForm =new FormGroup({
      'stopId':new FormControl(''),
      'stopName':new FormControl(''),
      'stopLat': new FormControl(''),
      'stopLng':new FormControl(''),
    });
  }
  getRoutes() {
    this.routesSer.getRoutes(this.bus_no)
      .subscribe(
        res => {
          console.log(res);
          this.stops = res.bus.stops.stop_detail;
          console.log(this.stops);
        },
        err => {
        }
      );
  }
  setStopDataInForm(stop: any){
    // this.stopForm.controls['index'].setValue();
    this.stopForm.controls['stopName'].setValue(stop.name);
    this.stopForm.controls['stopLat'].setValue(stop.lat);
    this.stopForm.controls['stopLng'].setValue(stop.lng);
  }
  editStop()
 {} 
}
