import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(protected http: HttpClient, protected app: AppService) { }
  
  fetchBuses() : Observable<any> {
    return this.http.get(this.app.baseUrl + '/1.0/buses');
  }
}
