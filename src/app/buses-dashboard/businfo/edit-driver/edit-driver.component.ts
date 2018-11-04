import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {
  editdriverForm: FormGroup;
  constructor(protected router: Router, protected fb: FormBuilder) { }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }

    this.editdriverForm = this.fb.group({
      driverName: ['', Validators.compose([
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
  editDriver(editdriverForm) {
    let payload = {
      driverName: this.editdriverForm.controls['driverNmae'].value,
      phNo: this.editdriverForm.controls['phNo'].value
    };
    console.log(editdriverForm);
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
