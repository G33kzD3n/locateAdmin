import { Component, OnInit } from '@angular/core';
import { PassengersService } from '../passengers/services/passengers.service';
import { Route, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  bus_no: number;
  passengers;
  constructor(protected passSer: PassengersService, protected ar: ActivatedRoute) { }

  ngOnInit() {
    this.bus_no = this.ar.snapshot.queryParams.busno;
    this.getBuses();
  }
  getBuses() {
    this.passSer.getPassengers(this.bus_no)
      .subscribe(
        res => {
          this.passengers = res.passengers;
        },
        err => {
          if (err.status == 0) {
            alert("Check your Internet connection");
          }
          else {
            alert("Wrong username or password");
          }
        }
      );
  }
}
