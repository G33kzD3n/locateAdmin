import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppService } from '../../app.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(protected http: HttpClient, protected app: AppService) { }

  sendMessage(payload, options): Observable<any> {
    return this.http.post(this.app.baseUrl + '/admin/1.0/notifications', payload, options);
  }
}
