import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/services/login.service';
import { Router } from '@angular/router';
import { MenuService } from '../menu/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  username: string = "";
  buses;
  constructor(protected logSer: LoginService, protected router: Router,protected menuSer:MenuService) {
    this.logSer.loggedIn = Boolean(localStorage.getItem('loggedIn'));
    
  }

  ngOnInit() {
    this.username = localStorage.getItem('username');
    this.fetchBuses();
  }

  logOut() {
    this.logSer.loggedIn = false;
    this.router.navigate(['']);
    localStorage.clear();
  }
  fetchBuses(){
    this.menuSer.fetchBuses()
    .subscribe(
      res=>{
        this.buses=res.buses;
        console.log(this.buses);
      },
      err=>{
        console.log(err);
      },
    )
  }
}
