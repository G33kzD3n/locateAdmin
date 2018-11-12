import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EditStudentService } from '../../home/edit-student/services/edit-student.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material';
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../../app.service';
import { AddBusService } from '../add-bus/services/add-bus.service';
@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {
  busForm: FormGroup;
  constructor(private dialogRef: MatDialogRef<AddBusComponent>,protected dialog: MatDialog, protected app: AppService, protected fb: FormBuilder,
    protected router: Router, protected addSer: AddBusService) { }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
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
  addBus(busForm) {
    let payload = {
      bus_no: this.busForm.controls['busno'].value,
      gps_device_id: this.busForm.controls['gpsid'].value
    };
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
    this.addSer.addBus(payload, options)
      .subscribe(
        res => {
          setTimeout(() => {
            this.dialogRef.close(res);
          }, 900);
          this.app.openSnackBar('New Bus Added', '');
          this.ngOnInit();
        },
        err => {
          if (err.status == 0) {
            alert("Check your Internet connection");
          }
        }
      );
  }
}
