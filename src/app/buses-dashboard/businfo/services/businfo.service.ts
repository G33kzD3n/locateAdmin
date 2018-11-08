import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../../app.service';


@Injectable({
  providedIn: 'root'
})
export class BusinfoService {

  constructor(protected http: HttpClient, protected app: AppService) { }

  getBuses(): Observable<any> {
    return this.http.get(this.app.baseUrl + '/1.0/buses');
  }
}
