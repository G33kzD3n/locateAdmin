import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../../../app.service';

import { EditBusService } from './services/edit-bus.service';


@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.css']
})
export class EditBusComponent implements OnInit {
  busForm: FormGroup;
  bus_no;
  file: any = null;
  constructor(protected router: Router, protected ar: ActivatedRoute, protected fb: FormBuilder, protected editBusser: EditBusService, protected app: AppService) { }


  ngOnInit() {
    this.bus_no = this.ar.snapshot.queryParams.busno;
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    // this.getBuses();
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
  editBus(busForm) {
    
    let payload = {
      bus_no: this.busForm.controls['busno'].value,
      gps_device_id: this.busForm.controls['gpsid'].value,
      photo: this.file,
    };
    // console.log(payload);
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
    this.editBusser.editBus(this.bus_no, payload, options)
      .subscribe(
        res => {
          console.log(res);
          this.app.openSnackBar(this.bus_no + ' Bus no changed to : ' + payload.bus_no, '');
          this.router.navigate(['businfo'],{ queryParams: { busno: payload.bus_no }});
         
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
        },
        err => {
          console.log(err);
          if (err.status == 0) {
            alert("Check your Internet connection");
          }
        }
      );
  }
  fileUpload(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
}
