import { Component, OnInit } from '@angular/core';
import { RegistrationsService } from '../registrations/services/registrations.service';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {
  users: any;
  constructor(protected regSer: RegistrationsService, protected router: Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    this.getRegistrations();
  }
  getRegistrations() {
    this.regSer.getRegistrations()
      .subscribe(
        res => {
          this.users = res;
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
