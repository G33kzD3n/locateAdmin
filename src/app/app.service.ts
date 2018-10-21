import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  baseUrl = "https://convoyfleet.herokuapp.com/public/api/1.0";
  constructor() {
    this.baseUrl = "https://convoyfleet.herokuapp.com/public/api/1.0";
  }
}