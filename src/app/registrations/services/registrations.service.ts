import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationsService {

  constructor(protected http: HttpClient, protected app: AppService) { }
  getRegistrations(): Observable<any> {
    return this.http.get(this.app.baseUrl2 + '/users');
  }
}
