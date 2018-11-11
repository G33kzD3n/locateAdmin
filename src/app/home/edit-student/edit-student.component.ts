import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { EditStudentService } from '../../home/edit-student/services/edit-student.service';
import { MAT_DIALOG_DATA, MatDialogRef , MatDialogConfig} from '@angular/material';
import { HttpHeaders } from '@angular/common/http';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  username: number;
  editstudentForm: FormGroup;
  file: any = null;
  busList;
  student;
  stops;
  id: any = null;
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private dialogRef: MatDialogRef<EditStudentComponent>,
    protected editstudSer: EditStudentService, protected router: Router, protected fb: FormBuilder, protected app: AppService) {
    this.username = data.username;
  }

  ngOnInit() {
    if (localStorage.getItem('loggedIn') !== 'true') {
      this.router.navigate(['login']);
    }
    /*
    creating the form
    */
    this.loadBusList();
    this.loadEditFormWithApiData();
    this.editstudentForm = this.makeEditForm();

  }
  loadBusList() {
    this.editstudSer.fetchBuses()
      .subscribe((res: any) => {
        this.busList = res.buses;
      },
        err => {
          console.log(err);
        });
  }
  makeEditForm() {
    return this.fb.group({
      studentName: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/),
      ])],
      studentUsername: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(11),
        Validators.maxLength(11),
      ])],
      level: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-2]*$/),
        Validators.minLength(0),
        Validators.maxLength(1),
      ])],
      phNo: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(10),
        Validators.maxLength(10),
      ])],
      busno: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[0-9]*$/),
        Validators.minLength(4),
        Validators.maxLength(4),
      ])],
      studentDeptname: ['', Validators.compose([
        Validators.required,
      ])],
      regOn: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/),
      ])],
      semester: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/^[1-6]*$/),
        Validators.minLength(1),
        Validators.maxLength(1),
      ])],
      course: ['', Validators.compose([
        Validators.required,
      ])],
      // stop_id: ['', Validators.compose([
      //   Validators.required,
      //   Validators.pattern(/^[0-99]*$/),
      //   Validators.minLength(1),
      //   Validators.maxLength(3),
      // ])],
      stops: ['', Validators.compose([
        Validators.required,
      ])],
    });
  }

  editStudent(editstudentForm: any) {
    console.log(this.editstudentForm.controls['stops'].value);
    const payload = new FormData();


    payload.append('_method', 'PATCH');
    payload.append('avatar', this.file == null ? null : this.file, this.file == null ? null : this.file.name);
    payload.append('name', this.editstudentForm.controls['studentName'].value);
    payload.append('username', this.editstudentForm.controls['studentUsername'].value);
    payload.append('level', this.editstudentForm.controls['level'].value);
    payload.append('phone_no', this.editstudentForm.controls['phNo'].value);
    payload.append('dept_id', this.editstudentForm.controls['studentDeptname'].value);
    payload.append('bus_no', this.editstudentForm.controls['busno'].value);
    payload.append('registered_on', this.editstudentForm.controls['regOn'].value);
    payload.append('semester', this.editstudentForm.controls['semester'].value);
    payload.append('course_id', this.editstudentForm.controls['course'].value);
    payload.append('stop_id', this.id);

    const options = {
      headers: new HttpHeaders({
        'Accept': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')
      })
    };
    this.editstudSer.editStudent(payload, this.username, options)
      .subscribe(
        res => {
          console.log(res);
          setTimeout(() => {
            this.dialogRef.close(res);
          }, 900);
          this.app.openSnackBar('Student Record has been modified', '');
        },
        err => {
          {
            setTimeout(() => {
              this.dialogRef.close(err);
            }, 900);
          }
        }
      );
  }
  fileUpload(event) {
    this.file = event.target.files[0];
  }

  loadEditFormWithApiData() {
    this.editstudSer.fetchUser(this.username)
      .subscribe((res: any) => {
        this.student = res.data;
        this.selectedBus(this.student.bus_no);
        setTimeout(() => {
            this.setStudentDataInForm(this.student);
          }, 500);
        // this.setStudentDataInForm(this.student);
      }, err => {
        console.log(err);
      }
      );
  }

  setStudentDataInForm(user: any) {
    console.log(user.stop.name);
    console.log(user.bus_no);
    // this.selectedBus(user.bus_no);
    console.log(this.stops);
    this.selectedStop(user.stop.name);
    console.log(this.id);
    this.editstudentForm.controls['studentName'].setValue(user.name);
    this.editstudentForm.controls['studentUsername'].setValue(this.username);
    this.editstudentForm.controls['level'].setValue(<string> user.level);
    this.editstudentForm.controls['phNo'].setValue(user.cell_no);
    this.editstudentForm.controls['busno'].setValue(user.bus_no);
    this.editstudentForm.controls['studentDeptname'].setValue(user.dept_code);
    this.editstudentForm.controls['regOn'].setValue(user.registration_date);
    this.editstudentForm.controls['semester'].setValue(user.semester_level);
    this.editstudentForm.controls['course'].setValue(user.dept_code);
    // this.editstudentForm.controls['stop_id'].setValue(user.stop.stop_no);
    this.editstudentForm.controls['stops'].setValue(user.stop.name);
  }

  // selectedBus(bus: any) {
  //   console.log(bus);
  //   this.editstudentForm.controls['busno'].setValue(bus.bus_no);
  // }

  selectedBus(busno) {
    this.editstudSer.fetchBus(busno).subscribe(
      (res: any) => {
        if (!res.bus.stops.names) {
          this.app.openSnackBar('No Stops assigned for this bus yet', '');
          this.stops = [];
        }
        else {
          console.log('selected bus function assigning stops to this.stops');
          this.stops = res.bus.stops.stop_detail;
          console.log(this.stops)
        }
      },
      err => {
        console.log(err);
      },
    )
  }
  selectedStop(stop) {
      for (let i = 0; i < (this.stops.length); i++) {
        if (stop == this.stops[i].name) {
          this.id = this.stops[i].id;
          console.log('id: ' + this.id);
      }
    }
  }
}
