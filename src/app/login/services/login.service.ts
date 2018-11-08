import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../app.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loggedIn = false;
  constructor(protected http: HttpClient, protected app: AppService) { }

  loginUser(payload: any): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.app.baseUrl + '/admin/1.0/login', payload);
  }
}
