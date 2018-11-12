import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../../app.service';



@Injectable({
  providedIn: 'root'
})
export class AddBusService {

  constructor(protected http: HttpClient, protected app: AppService) { }
  addBus(payload, options): Observable<any> {
    return this.http.post(this.app.baseUrl + '/admin/1.0/buses/create', payload, options);
    // another way to set headers
    //     headers: new HttpHeaders({
    //     'Authorization': 'Bearer ' +token,
    //     'Accept': 'application/json'
    //   })
    // });
  }
}
