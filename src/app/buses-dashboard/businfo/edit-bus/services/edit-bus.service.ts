import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../../../app.service';



@Injectable({
  providedIn: 'root'
})
export class EditBusService {

  constructor(protected http: HttpClient, protected app: AppService) { }



  editBus(bus_no, payload, options): Observable<any> {
    return this.http.put(this.app.baseUrl + '/admin/1.0/buses/' + bus_no + '/edit', payload, options);
  }
}
