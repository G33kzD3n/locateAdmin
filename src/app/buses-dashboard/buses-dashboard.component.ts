import { Component, OnInit } from '@angular/core';
import { BusesDashboardService } from '../buses-dashboard/services/buses-dashboard.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-buses-dashboard',
  templateUrl: './buses-dashboard.component.html',
  styleUrls: ['./buses-dashboard.component.css']
})
export class BusesDashboardComponent implements OnInit {
  buses: any;
  stops: any;
  constructor(protected busSer: BusesDashboardService, protected router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    this.getBuses();
  }

  getBuses() {
    this.busSer.getBuses()
      .subscribe(
        res => {
          this.buses = res.buses;
          this.stops = res.buses[0].stops.names.split(';');
          console.log(this.buses);
          console.log(this.stops);

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
  