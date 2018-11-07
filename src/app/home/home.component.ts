import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/services/home.service';
import { LoginService } from '../login/services/login.service';
import { Router } from '@angular/router';
import { FilterPipe } from '../filter.pipe';

import { EditDriverComponent } from '../buses-dashboard/businfo/edit-driver/edit-driver.component';
import { MatDialog, MatDialogRef } from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public users: any;
  public students: Boolean = true;
  public drivers: Boolean = false;
  public cordinators: Boolean = false;


  constructor(protected dialog: MatDialog, protected homeSer: HomeService, protected logSer: LoginService, protected router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    this.getUsers();
  }
  getUsers() {
    this.homeSer.getUsers()
      .subscribe(
        res => {
          this.users = res;
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
  showStudents() {
    this.students = true;
    this.drivers = false;
    this.cordinators = false;
  }
  showDrivers() {
    this.students = false;
    this.drivers = true;
    this.cordinators = false;
  }
  showCordinators() {
    this.students = false;
    this.drivers = false;
    this.cordinators = true;
  }
  openDialogdriver(username) {
    const dialogRef = this.dialog.open(EditDriverComponent, {
      height: '600px',
      width: '800px',
      data: { username: username },
    });
    //recive the data from editDriverComponet on succes or error when closing the matdialog
    dialogRef.beforeClose().subscribe(result => {
      console.log('*******' + JSON.stringify(result));
    });
  }
}
