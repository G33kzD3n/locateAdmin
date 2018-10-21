import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from '@angular/router';
import{ LoginService} from '../login/login.service';

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
  constructor(public fb: FormBuilder, public router: Router,public logSer: LoginService ) {
    //this.disableSignUp=false;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(11),
        Validators.minLength(11)
      ])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }
  loginUser(loginForm) {
    let payload = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value
    };
    let headers = new Headers({ 'Content-Type': 'application/json' });
    this.logSer.loginUser(payload)
    .subscribe(
      res=> {
        console.log(res);
        this.router.navigate(['menu']);
      },
      err =>{
        console.log(err);
      }
    );
  }
}
