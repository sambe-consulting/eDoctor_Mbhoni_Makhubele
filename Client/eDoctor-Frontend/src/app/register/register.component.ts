import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userData: any;
  login_url = 'http://localhost:5000/registeruser';

  registerMonitor = false;
  registerErrorMessage = '';

  constructor(private _usersevice: UserService, private http: HttpClient) {}

  ngOnInit(): void {}

  Register(form: NgForm) {
    this.userData = {
      ID_Number: form.value.idnumber,
      Name: form.value.name,
      Middle_Name: form.value.middlename,
      Surname: form.value.surname,
      Contact: form.value.contact,
      Email: form.value.email,
      Password: form.value.password,
      // "DOB": form.value.bod,
      DOB: '25/04/2002',
      Gender: 'Male',
      // "Gender": form.value.gender,
      Type: this._usersevice.getUserType(),
      Signup_Date: '12/06/2021', //This value is assigned on the server
      Rest_Code: 'AAAA',

      //Hard coded values for location
      Longitude: -12.4444,
      Latitude: 23.43947,
    };

    this.http.post(this.login_url, this.userData).subscribe((data: any) => {
      if (data['code'] == 0.1) {
        this.registerMonitor = true;
        this.registerErrorMessage = 'Identity number already exist';
      } else if (data['code'] == 0.2) {
        this.registerMonitor = true;
        this.registerErrorMessage = 'This email already exist';
      } else if (data['code'] == 0) {
        this.registerMonitor = true;
        this.registerErrorMessage =
          'Both email and identity number already exist';
      } else if (data['code'] == 1) {
        //redirect to login
      } else {
        this.registerMonitor = false;
        console.log(data);
      }
    });

    console.log(this.userData);
  }
}