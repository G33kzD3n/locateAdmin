import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username:string="";

  constructor(protected logSer: LoginService,protected router:Router) { }

  ngOnInit() {
    this.username=localStorage.getItem('username');
  }

  logOut() {
    this.router.navigate(['']);
    localStorage.clear();
  }

}
