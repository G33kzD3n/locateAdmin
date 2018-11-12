import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../../app.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteBusService {

  constructor(protected http:HttpClient,protected app:AppService) { }

  deleteBus(bus_no, options): Observable<any> {
    return this.http.delete(this.app.baseUrl + '/admin/1.0/buses/' + bus_no + '/delete', options);
  }
}
