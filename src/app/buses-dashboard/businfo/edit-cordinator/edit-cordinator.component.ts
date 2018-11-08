import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-edit-cordinator',
  templateUrl: './edit-cordinator.component.html',
  styleUrls: ['./edit-cordinator.component.css']
})
export class EditCordinatorComponent implements OnInit {
  editcordForm: FormGroup;
  public file: any = null;

  constructor(protected router: Router, protected fb: FormBuilder, private http: HttpClient) { 
    
  }

  ngOnInit() {
    console.log("hhhhh");
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }

    

    this.editcordForm = this.fb.group({
      cordName: ['', Validators.compose([
        Validators.required,

      ])],
      phNo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(10),
        Validators.maxLength(10),
      ])],
      level: [''],
      bus_no: [''],
      dept_id: [''],
      username: [''],
      registered_on: [''],
      stop_id: [''],
    });
  }

  fileUpload(event) {
    console.log(event);
    this.file = event.target.files[0];
    console.log(this.file);
}

  saveUser(user: any) {
    const payload = new FormData();
    console.log(payload);

    payload.append('_method', 'PATCH');
    payload.append('avatar', this.file == null ? null : this.file, this.file == null ? null : this.file.name);
    payload.append('name', user.controls['cordName'].value);
   // payload.append('username', user.controls['username'].value);
    payload.append('stop_id', user.controls['stop_id'].value);
    payload.append('username', user.controls['username'].value);
    payload.append('bus_no', user.controls['bus_no'].value);
    payload.append('level', user.controls['level'].value);
    // payload.append('semester', null);
    payload.append('dept_id', user.controls['dept_id'].value);
    // payload.append('course_id', null);
    payload.append('phone_no', user.controls['phNo'].value);
    payload.append('registered_on', user.controls['registered_on'].value);
    const baseurl = 'http://192.168.43.220:8000/api/admin/1.0/users/99999992002/edit';
    this.http.post(baseurl, payload, {
        headers: new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
            'Accept': 'application/json',
            // 'Content-Type': 'application/json'
        })
    })
        .subscribe(
            res => {
                console.log(res);
            },
            err => {
                console.log(err);
            }
        );
}
  // editCoord(editcordForm) {
  //   let payload = {
  //     cordName: this.editcordForm.controls['cordName'].value,
  //     phNo: this.editcordForm.controls['phNo'].value
  //   };

  //   console.log(editcordForm);
  //   console.log(payload);
  //   //   let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
  //   //   this.editBusser.editBus(this.bus_no, payload, options)
  //   //     .subscribe(
  //   //       res => {
  //   //         this.app.openSnackBar(this.bus_no + ' Bus no changed to : ' + payload.bus_no, '');
  //   //         setTimeout(() => {
  //   //           window.location.reload();
  //   //         }, 1000);
  //   //       },
  //   //       err => {
  //   //         if (err.status == 0) {
  //   //           alert("Check your Internet connection");
  //   //         }
  //   //       }
  //   //     );
  // }
}
