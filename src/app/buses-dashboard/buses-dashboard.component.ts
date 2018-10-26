import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{ AppService} from '../app.service';


@Component({
  selector: 'app-buses-dashboard',
  templateUrl: './buses-dashboard.component.html',
  styleUrls: ['./buses-dashboard.component.css']
})
export class BusesDashboardComponent implements OnInit {

  constructor(protected http: HttpClient, protected app: AppService) { }

  ngOnInit() {
    console.log("in it");
    this.http.get(this.app.baseUrl+'/buses')
    .subscribe(
      (response:Response)=>{
         const res = response.json();
         console.log(res+"sss");
      }
    );
  }
}
  