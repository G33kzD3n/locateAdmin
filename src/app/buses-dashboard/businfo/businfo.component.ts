import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BusinfoService } from '../businfo/services/businfo.service';
import { MaterialModule } from '../../material';
import { EditDriverComponent } from '../businfo/edit-driver/edit-driver.component';
import { EditCordinatorComponent } from '../businfo/edit-cordinator/edit-cordinator.component';
import { EditBusComponent } from '../businfo/edit-bus/edit-bus.component';


import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-businfo',
  templateUrl: './businfo.component.html',
  styleUrls: ['./businfo.component.css']
})
export class BusinfoComponent implements OnInit {
  bus_no: any;
  buses: any;
  buss: any;
  constructor(protected ar: ActivatedRoute, protected businfoSer: BusinfoService, protected dialog: MatDialog) { }

  ngOnInit() {
    this.bus_no = this.ar.snapshot.queryParams.busno;
    this.getBuses();
  }
  getBuses() {
    this.businfoSer.getBuses()
      .subscribe(
        res => {
          this.buses = res.buses;
          console.log(res.buses);
          for (let i = 0; i < res.buses.length; i++) {
            if (this.bus_no == res.buses[i].bus_no) {
              this.buss = res.buses[i];
            }
          }
          // console.log(this.buss);
        },
        err => {
          if (err.status == 0) {
            alert("Check your Internet connection");
          }
          else {
            alert("Wrong username or password");
          }
        }
      );
  }
  openDialogbus() {
    
    const dialogRef = this.dialog.open(EditBusComponent,{
      height: '335px',
      width: '600px',
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }
  openDialogdriver() {
    const dialogRef = this.dialog.open(EditDriverComponent,{
      height: '335px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }
  openDialogcordinator() {
    const dialogRef = this.dialog.open(EditCordinatorComponent,{
      height: '335px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ${result}');
    });
  }
}
