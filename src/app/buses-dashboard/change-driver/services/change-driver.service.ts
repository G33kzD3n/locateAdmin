import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../../app.service';

@Injectable({
  providedIn: 'root'
})
export class ChangeDriverService {

  constructor(protected http: HttpClient, protected app: AppService) { }
  getUsers(): Observable<any> {
    return this.http.get(this.app.baseUrl + '/1.0/users');
  }
  changeDriver(busno, username, options): Observable<any> {
    return this.http.put(this.app.baseUrl + '/admin/1.0/buses/' + busno + '/user/' + username, {}, options);
  }
}
