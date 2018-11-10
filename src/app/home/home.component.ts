import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/services/home.service';
import { LoginService } from '../login/services/login.service';
import { Router } from '@angular/router';
import { EditDriverComponent } from '../home/edit-driver/edit-driver.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { EditCordinatorComponent } from '../home/edit-cordinator/edit-cordinator.component';
import { EditStudentComponent } from '../home/edit-student/edit-student.component';
import { MessageComponent } from '../message/message.component';
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
      this.ngOnInit();
    });
  }

  openDialogCoord(username) {
    const dialogRef = this.dialog.open(EditCordinatorComponent, {
      height: '600px',
      width: '800px',
      data: { username: username },
    });
    //recive the data from editDriverComponet on succes or error when closing the matdialog
    dialogRef.beforeClose().subscribe(result => {
      console.log('*******' + JSON.stringify(result));
      this.ngOnInit();
    });
  }
  openDialogstudent(username) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height='600px';
    dialogConfig.width='800px';
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data={ username: username };
    const dialogRef = this.dialog.open(EditStudentComponent,dialogConfig);
    //recive the data from editDriverComponet on succes or error when closing the matdialog
    dialogRef.beforeClose().subscribe(result => {
      console.log('*******' + JSON.stringify(result));
      this.ngOnInit();
    });    
  }
  openDialogmessage(username) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height='452px';
    dialogConfig.width='600px';
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top:'40px'
  };
    const dialogRef = this.dialog.open(MessageComponent,dialogConfig);
    //recive the data from editDriverComponet on succes or error when closing the matdialog
    dialogRef.beforeClose().subscribe(result => {
      console.log('*******' + JSON.stringify(result));
    });
  }
}
