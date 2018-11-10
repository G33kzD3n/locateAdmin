import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messageForm: FormGroup;
  constructor(protected router: Router,protected fb: FormBuilder,protected app: AppService) { }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    // this.getBuses();
    this.messageForm = this.fb.group({
      subject: ['', Validators.compose([
        Validators.required,
      ])],
      message: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }
  messageStudent(messageForm:any){
    let payload = {
      subject :this.messageForm.controls['subject'],
      message :this.messageForm.controls['message']
    }
    console.log(payload.subject);
  }
}
