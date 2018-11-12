import { Component, OnInit } from '@angular/core';
import { BusesDashboardService } from '../buses-dashboard/services/buses-dashboard.service';
import { Router } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ChangeDriverComponent } from '../buses-dashboard/change-driver/change-driver.component';
import { DeleteBusComponent} from '../buses-dashboard/delete-bus/delete-bus.component';
@Component({
  selector: 'app-buses-dashboard',
  templateUrl: './buses-dashboard.component.html',
  styleUrls: ['./buses-dashboard.component.css']
})
export class BusesDashboardComponent implements OnInit {
  buses: any;
  bus_no: any;
  stops: any;
  busForm: FormGroup;

  constructor(protected dialog: MatDialog, protected app: AppService, protected fb: FormBuilder, protected busSer: BusesDashboardService,
    protected router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    this.getBuses();
    this.busForm = this.fb.group({
      busno: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.maxLength(4),
        Validators.minLength(4),
      ])],
      gpsid: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  getBuses() {
    this.busSer.getBuses()
      .subscribe(
        res => {
          this.buses = res.buses;
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
  // itemClicked(busno) {
  //   this.bus_no = busno;
  //   console.log(this.bus_no);
  // }
  gotoBusinfo(bus_no: number) {
    this.router.navigate(['businfo'], { queryParams: { busno: bus_no } });
  }
  addBus(busForm) {
    let payload = {
      bus_no: this.busForm.controls['busno'].value,
      gps_device_id: this.busForm.controls['gpsid'].value
    };
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
    this.busSer.addBus(payload, options)
      .subscribe(
        res => {
          this.app.openSnackBar('New Bus Added', '');
          // setTimeout(() => {
          //   window.location.reload();
          // }, 1000);
          this.router.navigate(['buses']);
          this.ngOnInit();
        },
        err => {
          if (err.status == 0) {
            alert("Check your Internet connection");
          }
        }
      );
  }

  assignedRoute(busno) {
    console.log(busno);
    this.busSer.getBus(busno)
      .subscribe(
        res => {
          if (!res.bus.stops.names) {
            console.log('no stops aasigned yet');
            this.app.openSnackBar("No Stops assigned yet", '');
            this.stops = [];
            console.log(this.stops);
          }
          else {
            this.stops = res.bus.stops.stop_detail;
            console.log(this.stops);
          }
        },
        err => {
          console.log(err);
        },
      )
  }
  openDialogChangeDriver(busno) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '280px';
    dialogConfig.width = '600px';
    dialogConfig.autoFocus = true;
    dialogConfig.position = {
      top: '40px'
    };
    dialogConfig.data={ busno: busno };
    const dialogRef = this.dialog.open(ChangeDriverComponent, dialogConfig);
    //recive the data from editDriverComponet on succes or error when closing the matdialog
    dialogRef.beforeClose().subscribe(result => {
      console.log('*******' + JSON.stringify(result));
      this.ngOnInit();
    });
  }
  openDialogDeleteBus(busno) {
    console.log(busno);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = '155px';
    dialogConfig.width = '600px';
    dialogConfig.autoFocus = true;
    dialogConfig.position = {

    };
    dialogConfig.data={ busno: busno };
    const dialogRef = this.dialog.open(DeleteBusComponent, dialogConfig);
    //recive the data from editDriverComponet on succes or error when closing the matdialog
    dialogRef.beforeClose().subscribe(result => {
      console.log('*******' + JSON.stringify(result));
      this.ngOnInit();
    });
  }
}
