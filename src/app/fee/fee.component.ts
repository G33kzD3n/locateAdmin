import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FeeService } from '../fee/services/fee.service';
@Component({
  selector: 'app-fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.css']
})
export class FeeComponent implements OnInit {
  users;
  buses;
  busForm:FormGroup;
  constructor(protected fb: FormBuilder,protected router: Router, protected feeSer: FeeService) { 
    this.busForm = this.fb.group({
    });
  }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    this.getUsers();
    this.getBuses();
  }
  getBuses() {
    this.feeSer.getBuses()
      .subscribe(
        res => {
          this.buses = res.buses;
          console.log(this.buses);
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
  getUsers() {
    this.feeSer.getUsers()
      .subscribe(
        res => {
          this.users = res
          console.log(res);
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
  busChosen(index: any, value: any) {
    const control = <FormArray>this.busForm.controls['lineEntries'];
    console.log('hhello');
     let busno = this.getChartAccNos(control.value);
     console.log('accounts choosen are : ' + busno);
    // if (accNos.includes(value)) {
    //   this.invalidForm = true;
    //   this.alertErrorMessage = "Cannot choose same account, for debit and credit.";
    // } else {
    //   control.at(index).get('chartaccno').setValue(value);
    //   control.at(index).get('chartaccname').setValue(this.getAccountName(value));
    //   control.at(index).get('chartacccode').setValue(this.getAccCode(value));
    // this.addNewLineEntry(index);
  }
  getChartAccNos(data): any {
    let ids = [];
    data.forEach((element) => {
      ids.push(element.busno);
    });
    return ids;
  }
}
