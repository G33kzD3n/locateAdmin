import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-edit-cordinator',
  templateUrl: './edit-cordinator.component.html',
  styleUrls: ['./edit-cordinator.component.css']
})
export class EditCordinatorComponent implements OnInit {
  editcordForm: FormGroup;
  constructor(protected router: Router, protected fb: FormBuilder) { }

  ngOnInit() {
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
    });
  }
  editDriver(editcordForm) {
    let payload = {
      cordName: this.editcordForm.controls['driverNmae'].value,
      phNo: this.editcordForm.controls['phNo'].value
    };
    console.log(editcordForm);
    console.log(payload);
    //   let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
    //   this.editBusser.editBus(this.bus_no, payload, options)
    //     .subscribe(
    //       res => {
    //         this.app.openSnackBar(this.bus_no + ' Bus no changed to : ' + payload.bus_no, '');
    //         setTimeout(() => {
    //           window.location.reload();
    //         }, 1000);
    //       },
    //       err => {
    //         if (err.status == 0) {
    //           alert("Check your Internet connection");
    //         }
    //       }
    //     );
  }
}
