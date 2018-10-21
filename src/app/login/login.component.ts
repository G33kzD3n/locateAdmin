import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import { LoginService } from '../login/services/login.service';

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
  constructor(public fb: FormBuilder, public router: Router, public logSer: LoginService) {
    //this.disableSignUp=false;
  }

  ngOnInit() {
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
          this.logSer.loggedIn = true;
          sessionStorage.setItem('username',res.data.name);
          this.router.navigate(['home']);
        },
        err => {
          console.log(err);
        }
      );
  }
}
