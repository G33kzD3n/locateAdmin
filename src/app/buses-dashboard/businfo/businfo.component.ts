import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinfoService } from '../businfo/services/businfo.service';
import { MaterialModule } from '../../material';

import { EditBusComponent } from '../businfo/edit-bus/edit-bus.component';
import {AppService} from '../../app.service'

import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-businfo',
  templateUrl: './businfo.component.html',
  styleUrls: ['./businfo.component.css']
})
export class BusinfoComponent implements OnInit {
  bus_no: any;
  buses: any;
  buss: any;
  bus:Boolean=true;
  passengers:boolean=false;
  routes:boolean=false;
  constructor(protected app:AppService,protected ar: ActivatedRoute, protected businfoSer: BusinfoService, protected dialog: MatDialog) { }

  ngOnInit() {
    this.bus_no = this.ar.snapshot.queryParams.busno;
    this.getBuses();
  }
  getBuses() {
    this.businfoSer.getBuses()
      .subscribe(
        res => {
          this.buses = res.buses;
          
          for (let i = 0; i < res.buses.length; i++) {
            if (this.bus_no == res.buses[i].bus_no) {
              this.buss = res.buses[i];
            }
          }
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
  openDialogbus() {
    const dialogRef = this.dialog.open(EditBusComponent,{
      height: '400px',
      width: '600px',
    });
    console.log('hhhhhhh');
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }

  showBus(){
    this.bus=true;
    this.passengers=false;
    this.routes=false;
  }
  showPassengers(){
    this.bus=false;
    this.passengers=true;
    this.routes=false;
  }
  showRoutes(){
    this.bus=false;
    this.passengers=false;
    this.routes=true;
  }
}
