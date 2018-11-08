import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../../app.service';

@Injectable({
  providedIn: 'root'
})
export class PassengersService {

  constructor(protected app: AppService, protected http: HttpClient) { }

  getPassengers(bus_no: number): Observable<any> {
    return this.http.get(this.app.baseUrl + '/1.0/buses/' + bus_no + '/passengers');
  }
}

