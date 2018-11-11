import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../app.service';
import { MessageService } from './services/message.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messageForm: FormGroup;
  constructor(protected router: Router, protected fb: FormBuilder, private dialogRef: MatDialogRef<MessageComponent>, protected app: AppService, protected message: MessageService) { }

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
  messageStudent(messageForm: any) {

    let payload = {
      subject: this.messageForm.controls['subject'].value,
      message: this.messageForm.controls['message'].value,
      time: this.app.calDate()
    };
    let options = { headers: new HttpHeaders({ 'Authorization': 'Bearer ' + localStorage.getItem('token') }) };
    console.log(options);
    this.message.sendMessage(payload, options)
      .subscribe(
        res => {
          console.log(res);
          setTimeout(() => {
            this.dialogRef.close(res);
          }, 800);
          this.app.openSnackBar('Message sent', '');
        }, err => {
          if (err.status == 400) {
            setTimeout(() => {
              this.dialogRef.close(err);
            }, 900);
            this.app.openSnackBar('Subejct is too small', '');
          }
        }
      );
  }
}
