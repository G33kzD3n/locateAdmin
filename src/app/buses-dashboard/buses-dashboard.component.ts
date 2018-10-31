import { Component, OnInit } from '@angular/core';
import { BusesDashboardService } from '../buses-dashboard/services/buses-dashboard.service';
import { RequestOptions, Headers } from '@angular/http';
import { Router } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-buses-dashboard',
  templateUrl: './buses-dashboard.component.html',
  styleUrls: ['./buses-dashboard.component.css']
})
export class BusesDashboardComponent implements OnInit {
  buses: any;
  stops: any;
  busForm: FormGroup;
  constructor(protected fb: FormBuilder, protected busSer: BusesDashboardService, protected router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    this.getBuses();
    this.busForm = this.fb.group({
      busno: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.maxLength(6),
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
  editBus(bus_no: number) {
    let token = localStorage.getItem('token');
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('Authorization', 'Bearer ' + token);
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    this.busSer.editBus(bus_no, options)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
          if (err.status == 0) {
            alert("Check your Internet connection");
          }
        }
      );
  }
  addBus(busForm) {
    let payload = {
      bus_no: this.busForm.controls['busno'].value,
      gps_id: this.busForm.controls['gpsid'].value
    };
    // let headers = new Headers({ 'Content-Type': 'application/json' });
    // headers.append('Authorization', 'Bearer ' +localStorage.getItem('token'));
    // let headers = new Headers({'Content-Type':'application/json','Authorization':'Bearer '+localStorage.getItem('token')});
    //let options = new RequestOptions({ headers: headers });
    this.busSer.addBus(payload)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
          if (err.status == 0) {
            alert("Check your Internet connection");
          }
        }
      );
  }
  deleteBus(bus_no) {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') });
    let options = new RequestOptions({ headers: headers });
    this.busSer.deleteBus(bus_no, options)
      .subscribe(
        res => {
          console.log(res);
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
