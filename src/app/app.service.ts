import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { DatePipe } from '@angular/common';
@Injectable({
  providedIn: 'root'
})

export class AppService {
  
  baseUrl = '';
  baseUrl2 = '';
  myDate;
  constructor(protected mat: MatSnackBar,protected datepipe:DatePipe) {

   
    // this.baseUrl = "http://192.168.43.58:9000/api/admin/1.0";
    // this.baseUrl2 = "http://192.168.43.58:9000/api/1.0";
    this.baseUrl = "http://192.168.43.58:9000/api";
  // this.baseUrl = "http://192.168.43.220:8000/api";

  }
  openSnackBar(message: string, action: string) {
    this.mat.open(message, action, { duration: 2000, });
  }
  calDate() {
    this.myDate = new Date();
    let latest_date: String = this.datepipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss');
    return latest_date;
  }
}