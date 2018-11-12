import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { ChangeDriverService } from '../change-driver/services/change-driver.service';
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-change-driver',
  templateUrl: './change-driver.component.html',
  styleUrls: ['./change-driver.component.css']
})
export class ChangeDriverComponent implements OnInit {
  changeDriverForm: FormGroup;
  busno: number;
  users;
  username;
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<ChangeDriverComponent>, protected driSer: ChangeDriverService,
    protected router: Router, protected app: AppService, protected fb: FormBuilder) {
    this.busno = data.busno;
  }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    this.getUsers();
    this.changeDriverForm = this.makeEditForm();
  }
  makeEditForm() {
    return this.fb.group({
      driverName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
      ])],
    });
  }
  getUsers() {
    this.driSer.getUsers()
      .subscribe(
        res => {
          this.users = res.data;
        },
        err => {
          if (err.status == 0) {
            alert('Check your Internet connection');
          } else {
            alert('Wrong username or password');
          }
        }
      );
  }
  selectedDriver(driver) {
    for (let i = 0; i < (this.users.length); i++) {
      if (driver == this.users[i].name) {
        this.username = this.users[i].username;
        console.log(this.username);
      }
    }
  }
  changeDriver() {
    console.log(this.busno);
    console.log(this.username);
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
    this.driSer.changeDriver(this.busno, this.username, options)
      .subscribe(
        res => {
          console.log(res);
          setTimeout(() => {
            this.dialogRef.close(res);
          }, 900);
          this.app.openSnackBar('Driver Changed Successfully', '');
        },
        err => {
          console.log(err);
          setTimeout(() => {
            this.dialogRef.close(err);
          }, 900);
        },
      )
  }
}
