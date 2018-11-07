import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  baseUrl = '';
  baseUrl2 = '';

  constructor(protected mat: MatSnackBar) {

    this.baseUrl = 'http://localhost:8000/api/admin/1.0';
    this.baseUrl2 = 'http://localhost:8000/api/admin/1.0';

  }
  openSnackBar(message: string, action: string) {
    this.mat.open(message, action, { duration: 2000, });
  }
}