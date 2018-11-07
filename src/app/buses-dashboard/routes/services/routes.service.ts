import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../../app.service';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(protected http: HttpClient, protected app: AppService) { }

  getRoutes(bus_no: Number): Observable<any> {
    return this.http.get(this.app.baseUrl2 + '/buses/' + bus_no);
  }
}
