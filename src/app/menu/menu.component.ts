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

  constructor(protected logSer: LoginService,protected router:Router) { 
    this.logSer.loggedIn = Boolean(sessionStorage.getItem('loggedIn'));
  }

  ngOnInit() {    
    this.username=sessionStorage.getItem('username');
    
  }

  logOut() {
    this.logSer.loggedIn = false;
    this.router.navigate(['']);
    sessionStorage.clear();
  }

}
