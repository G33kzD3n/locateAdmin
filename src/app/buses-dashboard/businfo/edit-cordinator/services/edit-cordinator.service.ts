import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../../../app.service';
@Injectable({
  providedIn: 'root'
})
export class EditCoordinatorService {

  constructor(protected http: HttpClient, protected app: AppService) { }
  editCoord(payload, username, options): Observable<any> {
    return this.http.post(this.app.baseUrl + '/admin/1.0/users/' + username + '/edit', payload, options);
  }
  fetchUser(username: any) {
    return this.http.get(this.app.baseUrl + '/1.0/users/' + username);
  }
  fetchBuses() {
    return this.http.get(this.app.baseUrl + '/1.0/buses');
  }
}