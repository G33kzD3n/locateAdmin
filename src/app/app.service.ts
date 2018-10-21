import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
 // baseUrl = "https://convoyfleet.herokuapp.com/public/api/1.0";
 baseUrl="http://192.168.43.58:9000/api/1.0";
  constructor() {
    // this.baseUrl = "https://convoyfleet.herokuapp.com/public/api/1.0";
    this.baseUrl = "http://192.168.43.58:9000/api/1.0";
  }
}