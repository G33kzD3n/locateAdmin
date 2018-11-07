import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { EditDriverService } from '../edit-driver/services/edit-driver.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {

  editdriverForm: FormGroup;
  public file:any = null;
  username;
  constructor(@Inject(MAT_DIALOG_DATA) data: any, protected editdriSer: EditDriverService, protected router: Router, protected fb: FormBuilder) {
    this.username = data.username;
    console.log(this.username);
  }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }

    this.editdriverForm = this.fb.group({
      driverName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^([a-zA-z\s]{4,32})$/),
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
  editDriver(editdriverForm:any) {
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
    
    console.log(payload);
    console.log(this.username);
    let options = { headers: new HttpHeaders({ 'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
    console.log(localStorage.getItem('token'));
    this.editdriSer.editDriver(payload, this.username, options)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          {
            console.log(err);
          }
        }
      );
  }
  fileUpload(event) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
}
