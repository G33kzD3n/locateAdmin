import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
    userForm: FormGroup;
    public file: any = null;
    constructor(public fb: FormBuilder, private http: HttpClient,
        public router: Router, public ar: ActivatedRoute) {

    }

    ngOnInit() {
        this.userForm = this.fb.group({
            name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            username: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
            level: ['0'],
            stop_id: ['1'],
            phone_no: ['9018556691'],
            registered_on: ['2018-10-12'],
            semester: ['2'],
            course_id: ['MCA'],
            dept_id: ['PGDC'],
            bus_no: ['8840']
        });
    }
    fileUpload(event) {
        console.log(event);
        this.file = event.target.files[0];
    }
    saveUser(user: any) {
        const payload = new FormData();

        payload.append('_method', 'PATCH');
        payload.append('avatar', this.file == null ? null : this.file, this.file == null ? null : this.file.name);
        payload.append('name', user.controls['name'].value);
        payload.append('username', user.controls['username'].value);
        payload.append('stop_id', '1');
        payload.append('bus_no', '8840');
        payload.append('level', '2');
        // payload.append('semester', null);
        payload.append('dept_id', 'PGDCS');
        // payload.append('course_id', null);
        payload.append('phone_no', '9906559891');
        payload.append('registered_on', '2005-12-10');
        const baseurl = 'http://localhost:8000/api/admin/1.0/users/99999992003/edit';
        this.http.post(baseurl, payload, {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + 'SBXnFdAsfXZVwKXnwCdSG0gcTallO0EO2Z2af0YonmG1GNbRQzw70KEZMSCE',
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

}
