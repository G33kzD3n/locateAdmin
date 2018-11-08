import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: string = "";
  email: string = "";

  constructor() { }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
  }

}
