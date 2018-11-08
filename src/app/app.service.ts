import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // baseUrl = "https://convoyfleet.herokuapp.com/public/api/1.0";
  //baseUrl="http://192.168.43.220:8000/api/1.0";
  // baseUrl = "http://192.168.43.58:9000/api/admin/1.0";
  // baseUrl2 = "http://192.168.43.58:9000/api/1.0";
  baseUrl = "http://192.168.43.220:8000/api/admin/1.0";
  baseUrl2 = "http://192.168.43.220:8000/api/1.0";
  constructor(protected mat: MatSnackBar) {
    // this.baseUrl = "https://convoyfleet.herokuapp.com/public/api/1.0";
    // this.baseUrl = "http://192.168.43.220:8000/api/1.0";
    // this.baseUrl = "http://192.168.43.58:9000/api/admin/1.0";
    // this.baseUrl2 = "http://192.168.43.58:9000/api/1.0";
    this.baseUrl = "http://192.168.43.220:8000/api/admin/1.0";
    this.baseUrl2 = "http://192.168.43.220:8000/api/1.0";
  }
  openSnackBar(message: string, action: string) {
    this.mat.open(message, action, { duration: 2000, });
  }
}