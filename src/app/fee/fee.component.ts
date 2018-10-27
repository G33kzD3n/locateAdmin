import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent implements OnInit {

  constructor(protected router:Router) { }

  ngOnInit() {
    if (sessionStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
  }

}
