import { Component, OnInit } from '@angular/core';
import { HomeService } from '../home/services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  public users: any;
  constructor(protected homeSer: HomeService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.homeSer.getUsers()
      .subscribe(
        res => {
          this.users = res;
          console.log(this.users);
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
