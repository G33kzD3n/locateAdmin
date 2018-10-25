import { Component, OnInit } from '@angular/core';
import { BusesDashboardService } from '../buses-dashboard/services/buses-dashboard.service';


@Component({
  selector: 'app-buses-dashboard',
  templateUrl: './buses-dashboard.component.html',
  styleUrls: ['./buses-dashboard.component.css']
})
export class BusesDashboardComponent implements OnInit {
  buses:any;
  constructor(protected busSer: BusesDashboardService) { }

  ngOnInit() {
    this.getBuses();
  }

  getBuses() {
    this.busSer.getBuses()
      .subscribe(
        res => {
          this.buses = res.buses;
          console.log(this.buses);
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
