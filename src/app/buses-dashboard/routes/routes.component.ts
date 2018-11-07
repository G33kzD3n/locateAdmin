import { Component, OnInit } from '@angular/core';
import { PassengersService } from '../passengers/services/passengers.service';
import { Route, ActivatedRoute } from '@angular/router';
import { RoutesService } from '../../buses-dashboard/routes/services/routes.service';
@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {
  bus_no: number;
  stops: string;
  latLngs: number;

  constructor(protected routesSer: RoutesService, protected ar: ActivatedRoute) { }

  ngOnInit() {
    this.bus_no = this.ar.snapshot.queryParams.busno;
    this.getRoutes();
  }
  getRoutes() {
    this.routesSer.getRoutes(this.bus_no)
      .subscribe(
        res => {
          this.stops = res.bus.stops.names.split(';');
          this.latLngs = res.bus.stops.latLngs;
          console.log(this.stops);
          console.log(this.latLngs);
        },
        err => {
        }
      );
  }

}
