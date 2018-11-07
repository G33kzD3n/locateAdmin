import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../../../app.service';
@Injectable({
  providedIn: 'root'
})
export class EditDriverService {

  constructor(protected http: HttpClient, protected app: AppService) { }
  editDriver(payload,username,options): Observable<any> {
    return this.http.post(this.app.baseUrl + '/users/' + username + '/edit', payload, options);
  }
}
