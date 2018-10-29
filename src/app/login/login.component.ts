import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginService } from '../login/services/login.service';
import {AppService} from '../app.service';
// import { toastr } from 'toastr';
// import{ toast }from 'angular-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public title: string = "Login";
  loginForm: FormGroup;
  heading = "Singn Up";
  disableSignUp = true;
  constructor(protected fb: FormBuilder, protected router: Router, protected logSer: LoginService,
    protected app:AppService) {
    //this.disableSignUp=false;
  }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') == 'true') {
      this.router.navigate(['home']);
    }
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11),
        Validators.pattern(/[0-9]*/),
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/)])],
    });
  }
  loginUser(loginForm) {
    let payload = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    };
    this.logSer.loginUser(payload)
      .subscribe(
        res => {
          localStorage.setItem('loggedIn', 'true');
          this.logSer.loggedIn = true;
          localStorage.setItem('username', res.data.name);
          
          this.router.navigate(['home']);
          this.app.openSnackBar('Welcome','');
        },
        err => {
          console.log(err.status);
          if (err.status == 0) {
            alert("Check your Internet connection");
          }
          else {
            alert("Wrong username or password");
          }
        }
      );
  }
}
