import { Component, OnInit, Inject} from '@angular/core';
import { Router } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../../app.service';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import {DeleteBusService } from '../delete-bus/services/delete-bus.service';
@Component({
  selector: 'app-delete-bus',
  templateUrl: './delete-bus.component.html',
  styleUrls: ['./delete-bus.component.css']
})
export class DeleteBusComponent implements OnInit {
  busno:number;
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<DeleteBusComponent>,protected delSer:DeleteBusService,protected app:AppService) { 
    this.busno = data.busno;
  }

  ngOnInit() {
  }
  deleteBus() {
    let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
    this.delSer.deleteBus(this.busno, options)
      .subscribe(
        res => {
          console.log(res);
          setTimeout(() => {
            this.dialogRef.close(res);
          }, 900);
          this.app.openSnackBar(this.busno + ' bus has been deleted', '');
        },
        err => {
          setTimeout(() => {
            this.dialogRef.close(err);
          }, 400);
          if (err.status == 0) {
            alert("Check your Internet connection");
          }
        }
      );
  }
}
