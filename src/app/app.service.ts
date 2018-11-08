import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  
  baseUrl = '';
  baseUrl2 = '';

  constructor(protected mat: MatSnackBar) {

   
    // this.baseUrl = "http://192.168.43.58:9000/api/admin/1.0";
    // this.baseUrl2 = "http://192.168.43.58:9000/api/1.0";
    this.baseUrl = "http://192.168.43.58:9000/api";
    

  }
  openSnackBar(message: string, action: string) {
    this.mat.open(message, action, { duration: 2000, });
  }
}