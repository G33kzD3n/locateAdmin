import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../../app.service';
import { ChangeCoordinatorService } from '../../buses-dashboard/change-coordinator/services/change-coordinator.service';
@Component({
  selector: 'app-change-coordinator',
  templateUrl: './change-coordinator.component.html',
  styleUrls: ['./change-coordinator.component.css']
})
export class ChangeCoordinatorComponent implements OnInit {
  changeCoordForm: FormGroup;
  busno: number;
  users;
  username;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,private dialogRef: MatDialogRef<ChangeCoordinatorComponent>, 
  protected coordSer: ChangeCoordinatorService,
    protected router: Router, protected app: AppService, protected fb: FormBuilder) {
    this.busno = data.busno;
    console.log(this.busno+"cons")
  }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    this.getUsers();
    this.changeCoordForm = this.makeEditForm();
  }
  makeEditForm() {
    return this.fb.group({
      coordName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
      ])],
    });
  }
  getUsers() {
    this.coordSer.getUsers()
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
  selectedCoord(coordinator) {
    for (let i = 0; i < (this.users.length); i++) {
      if (coordinator == this.users[i].name) {
        this.username = this.users[i].username;
        console.log(this.username);
        console.log(this.busno);
      }
    }
  }
  changeCoord() {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
    this.coordSer.changeCoord(this.busno, this.username, options)
      .subscribe(
        res => {
          console.log(res);
          setTimeout(() => {
            this.dialogRef.close(res);
          }, 900);
          this.app.openSnackBar('Coordinator Changed Successfully', '');
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