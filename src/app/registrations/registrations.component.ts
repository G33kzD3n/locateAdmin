import { Component, OnInit } from '@angular/core';
import { RegistrationsService } from '../registrations/services/registrations.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: ['./registrations.component.css']
})
export class RegistrationsComponent implements OnInit {
  users: any;
  constructor(protected regSer: RegistrationsService) { }

  ngOnInit() {
    this.getRegistrations();
  }
  getRegistrations() {
    this.regSer.getRegistrations()
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
