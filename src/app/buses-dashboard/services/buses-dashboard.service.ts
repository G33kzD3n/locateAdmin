import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../app.service';


@Injectable({
  providedIn: 'root'
})
export class BusesDashboardService {

  constructor(protected http: HttpClient, protected app: AppService) { }

  getBuses(): Observable<any> {
    return this.http.get(this.app.baseUrl + '/1.0/buses');
  }
  getBus(busno): Observable<any> {
    return this.http.get(this.app.baseUrl + '/1.0/buses/' + busno);
  }

  // addBus(payload, options): Observable<any> {
  //   return this.http.post(this.app.baseUrl + '/admin/1.0/buses/create', payload, options);
  //   // another way to set headers
  //   //     headers: new HttpHeaders({
  //   //     'Authorization': 'Bearer ' +token,
  //   //     'Accept': 'application/json'
  //   //   })
  //   // });
  // }
  
  // deleteBus(bus_no, options): Observable<any> {
  //   return this.http.delete(this.app.baseUrl + '/admin/1.0/buses/' + bus_no + '/delete', options);
  // }
  // editBus(bus_no, payload, options): Observable<any> {
  //   return this.http.put(this.app.baseUrl + '/buses/' + bus_no + '/edit',payload, options);
  // }
}
