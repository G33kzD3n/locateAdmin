import { Component, OnInit } from '@angular/core';
import { BusesDashboardService } from '../buses-dashboard/services/buses-dashboard.service';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';

@Component({
  selector: 'app-buses-dashboard',
  templateUrl: './buses-dashboard.component.html',
  styleUrls: ['./buses-dashboard.component.css']
})
export class BusesDashboardComponent implements OnInit {
  buses: any;
  bus_no: any;
  stops: any;
  busForm: FormGroup;
  constructor(protected app: AppService, protected fb: FormBuilder, protected busSer: BusesDashboardService,
    protected router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    this.getBuses();
    this.busForm = this.fb.group({
      busno: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.maxLength(4),
        Validators.minLength(4),
      ])],
      gpsid: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  getBuses() {
    this.busSer.getBuses()
      .subscribe(
        res => {
          this.buses = res.buses;
          this.stops = res.buses[0].stops.names.split(';');

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
  itemClicked(bus_no) {
    this.bus_no = bus_no;
  }
  editBus(bus_no: number) {
    this.router.navigate(['bus']);
    // { queryParams: { busno: bus_no } });
  }
  addBus(busForm) {
    let payload = {
      bus_no: this.busForm.controls['busno'].value,
      gps_device_id: this.busForm.controls['gpsid'].value
    };
    //older way
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('Authorization', 'Bearer ' +localStorage.getItem('token'));
    //new way to set headers in angular 6
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
    this.busSer.addBus(payload, options)
      .subscribe(
        res => {
          this.app.openSnackBar('New Bus Added', '');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        err => {
          console.log(err);
          if (err.status == 0) {
            alert("Check your Internet connection");
          }
        }
      );
  }
  deleteBus() {
    console.log(this.bus_no);
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
    this.busSer.deleteBus(this.bus_no, options)
      .subscribe(
        res => {
          this.app.openSnackBar(this.bus_no + ' bus has been deleted', '');
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        err => {
          console.log(err);
          if (err.status == 0) {
            alert("Check your Internet connection");
          }
        }
      );
  }
}
