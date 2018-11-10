import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EditDriverService } from '../edit-driver/services/edit-driver.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {

  editdriverForm: FormGroup;
  public file: any = null;
  username: any;
  busList: any[];
  stopList: any = [];
  driver: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<EditDriverComponent>,
    protected editdriSer: EditDriverService, protected router: Router, protected fb: FormBuilder,protected app:AppService) {

    this.username = data.username;

  }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    /*
    creating the form
    */
    this.loadBusList();
    this.loadEditFormWithApiData();
    this.editdriverForm = this.makeEditForm();

  }
  loadBusList() {
    this.editdriSer.fetchBuses()
      .subscribe((res: any) => {
        this.busList = res.buses;
      },
        err => {
          console.log(err);
        });
  }
  makeEditForm() {
    return this.fb.group({
      driverName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
      ])],
      driverUsername: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(11),
        Validators.maxLength(11),
      ])],
      level: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-2]*$/),
        Validators.minLength(1),
        Validators.maxLength(1),
      ])],
      phNo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(10),
        Validators.maxLength(10),
      ])],
      busno: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(4),
        Validators.maxLength(4),
      ])],
      driverDeptname: ['', Validators.compose([
        Validators.required,
      ])],
      regOn: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
      ])],
    });
  }

  editDriver(editdriverForm: any) {
    const payload = new FormData();


    payload.append('_method', 'PATCH');
    payload.append('avatar', this.file == null ? null : this.file, this.file == null ? null : this.file.name);
    payload.append('name', this.editdriverForm.controls['driverName'].value);
    payload.append('username', this.editdriverForm.controls['driverUsername'].value);
    payload.append('level', this.editdriverForm.controls['level'].value);
    payload.append('phone_no', this.editdriverForm.controls['phNo'].value);
    payload.append('dept_id', this.editdriverForm.controls['driverDeptname'].value);
    payload.append('bus_no', this.editdriverForm.controls['busno'].value);
    payload.append('registered_on', this.editdriverForm.controls['regOn'].value);

    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    this.editdriSer.editDriver(payload, this.username, options)
      .subscribe(
        res => {
          console.log(res);
          setTimeout(() => {
            this.dialogRef.close(res);
          }, 900);
          this.app.openSnackBar('Driver Record has been modified', '');
        },
        err => {
          {
            setTimeout(() => {
              this.dialogRef.close(err);
            }, 900);
          }
        }
      );
  }
  fileUpload(event) {
    this.file = event.target.files[0];
  }

  loadEditFormWithApiData() {
    this.editdriSer.fetchUser(this.username)
      .subscribe((res: any) => {
        this.driver = res.data;
        this.setDriverDataInForm(this.driver);
        console.log(res);
      }, err => {
        console.log(err);
      }
      );
  }

  setDriverDataInForm(user: any) {
    this.editdriverForm.controls['driverName'].setValue(user.name);
    this.editdriverForm.controls['driverUsername'].setValue(this.username);
    this.editdriverForm.controls['level'].setValue(user.level);
    this.editdriverForm.controls['phNo'].setValue(user.cell_no);
    this.editdriverForm.controls['busno'].setValue(user.bus_no);
    this.editdriverForm.controls['driverDeptname'].setValue(user.dept_code);
    this.editdriverForm.controls['regOn'].setValue(user.registration_date);
  }

  selectedBus(bus: any) {
    this.editdriverForm.controls['busno'].setValue(bus.bus_no);
  }

}
