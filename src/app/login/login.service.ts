import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ AppService} from '../app.service';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public http: HttpClient,public app: AppService) { }

loginUser(payload: any): Observable<any> {
  return this.http.post(this.app.baseUrl + '/login', payload);
}
}
