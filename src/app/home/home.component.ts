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
          console.log(this.logSer.loggedIn);
          console.log(localStorage.getItem('loggedIn'));
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
}
