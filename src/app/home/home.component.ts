import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/services/home.service';
import { LoginService } from '../login/services/login.service';
import { Router } from '@angular/router';
import { FilterPipe } from '../filter.pipe';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public users: any;
  public students: boolean = true;
  public drivers: boolean = false;
  public cordinators: boolean = false;


  constructor(protected homeSer: HomeService, protected logSer: LoginService, protected router: Router) { }

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
}
