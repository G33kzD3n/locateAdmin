import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { HttpHeaders } from '@angular/common/http';
import { EditCoordinatorService } from './services/edit-cordinator.service';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-edit-cordinator',
  templateUrl: './edit-cordinator.component.html',
  styleUrls: ['./edit-cordinator.component.css']
})
export class EditCordinatorComponent implements OnInit {
  editcordForm: FormGroup;
  public file: any = null;

  username: any;
  busList: any[];
  coordinator: any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<EditCordinatorComponent>,
    protected router: Router, protected fb: FormBuilder,
    protected editcordSer: EditCoordinatorService) {
    this.username = data.username;
  }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    this.loadBusList();
    this.loadEditFormWithApiData();
    this.editcordForm = this.makeEditForm();
  }

  loadBusList() {
    this.editcordSer.fetchBuses()
      .subscribe((res: any) => {
        this.busList = res.buses;
      },
        err => {
          console.log(err);
        });
  }

  makeEditForm() {
    return this.fb.group({
      Name: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
      ])],
      Username: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(11),
        Validators.maxLength(11),
      ])],
      level: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-2]*$/),
        Validators.minLength(1),
        Validators.maxLength(1),
      ])],
      phNo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(10),
        Validators.maxLength(10),
      ])],
      busno: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(4),
        Validators.maxLength(4),
      ])],
      StopId: ['', Validators.compose([
        Validators.required,
      ])],
      Deptname: ['', Validators.compose([
        Validators.required,
      ])],
      regOn: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
      ])],
    });
  }

  fileUpload(event) {
    this.file = event.target.files[0];
  }


  editCoord(editcordForm: any) {
    const payload = new FormData();


    payload.append('_method', 'PATCH');
    payload.append('avatar', this.file == null ? null : this.file, this.file == null ? null : this.file.name);
    payload.append('name', this.editcordForm.controls['Name'].value);
    payload.append('username', this.editcordForm.controls['Username'].value);
    payload.append('level', this.editcordForm.controls['level'].value);
    payload.append('phone_no', this.editcordForm.controls['phNo'].value);
    payload.append('stop_id', this.editcordForm.controls['StopId'].value);
    payload.append('dept_id', this.editcordForm.controls['Deptname'].value);
    payload.append('bus_no', this.editcordForm.controls['busno'].value);
    payload.append('registered_on', this.editcordForm.controls['regOn'].value);

    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    this.editcordSer.editCoord(payload, this.username, options)
      .subscribe(
        res => {
          console.log(res);
          setTimeout(() => {
            this.dialogRef.close(res);
          }, 900);

        },
        err => {
          {
            setTimeout(() => {
              this.dialogRef.close(err);
            }, 900);
          }
        }
      );
  }

  loadEditFormWithApiData() {
    this.editcordSer.fetchUser(this.username)
      .subscribe((res: any) => {
        this.coordinator = res.data;
        this.setDataInForm(this.coordinator);
      }, err => {
        console.log(err);
      }
      );
  }

  setDataInForm(user: any) {
    this.editcordForm.controls['Name'].setValue(user.name);
    this.editcordForm.controls['Username'].setValue(this.username);
    this.editcordForm.controls['level'].setValue(user.level);
    this.editcordForm.controls['phNo'].setValue(user.cell_no);
    this.editcordForm.controls['busno'].setValue(user.bus_no);
    this.editcordForm.controls['StopId'].setValue(user.stop.stop_no);
    this.editcordForm.controls['Deptname'].setValue(user.dept_code);
    this.editcordForm.controls['regOn'].setValue(user.registration_date);
  }
  selectedBus(bus: any) {
    this.editcordForm.controls['busno'].setValue(bus.bus_no);
  }
}
