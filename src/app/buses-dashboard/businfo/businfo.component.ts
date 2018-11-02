import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinfoService } from '../businfo/services/businfo.service';

@Component({
  selector: 'app-businfo',
  templateUrl: './businfo.component.html',
  styleUrls: ['./businfo.component.css']
})
export class BusinfoComponent implements OnInit {
  bus_no: any;
  buses:any;
  constructor(protected ar: ActivatedRoute,protected businfoSer: BusinfoService) { }

  ngOnInit() {
    this.bus_no = this.ar.snapshot.queryParams.busno;
    this.getBuses();
  }
  getBuses() {
    this.businfoSer.getBuses()
      .subscribe(
        res => {
          this.buses=res.buses;
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
