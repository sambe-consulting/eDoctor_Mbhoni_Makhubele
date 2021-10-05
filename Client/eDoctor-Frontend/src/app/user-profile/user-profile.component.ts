import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModelsService } from '../models/models.service';
import { Patient } from '../models/users/patient';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  ID_Number = '';
  Name = '';
  M_Name = '';
  Surname = '';
  Contact = '';
  Email = '';
  Password = '';
  DOB = '';
  Gender = '';
  Signup_Date = '';

  patient: any | undefined;

  correctPassword = true;
  incorrectPassword = false;
  ErrorMessage = '';

  updateSuccess = false;
  successMessage = 'Profile successfully updated';

  constructor(
    private _modelsService: ModelsService,
    private _url: UrlService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.patient = this._modelsService.getUser();

    this.ID_Number = this.patient.ID_Number;
    this.Name = this.patient.Name;
    this.M_Name = this.patient.M_Name;
    this.Surname = this.patient.Surname;
    this.Contact = this.patient.Contact;
    this.Email = this.patient.Email;
    this.Password = this.patient.Password;
    this.DOB = this.patient.getDOB();
    this.Gender = this.patient.Gender;
  }

  updateUser(form: NgForm) {
    //Name. Middle name, Surname, contact, email
    this.patient = this._modelsService.getUser();
    let userData = {
      ID_Number: this.patient.ID_Number,
      Name: form.value.name,
      M_Name: form.value.middlename,
      Surname: form.value.surname,
      Contact: form.value.contact,
      Email: form.value.email,
    };
    console.log(userData);

    this.http
      .put(this._url.getUrl() + 'updateuser', userData)
      .subscribe((data: any) => {
        this._modelsService.updatePatient(data);
        this.updateSuccess = true;
        setTimeout(() => {
          this.updateSuccess = false;
        }, 30000);
      });
  }

  updatePass(form: NgForm) {
    this.patient = this._modelsService.getUser();

    if (this.patient.Password == form.value.oldpassword) {
      if (form.value.newpassword == form.value.confirmpassword) {
        let userData = {
          ID_Number: this.patient.ID_Number,
          Password: form.value.newpassword,
        };

        this.incorrectPassword = true;
        this.correctPassword = true;
        this.ErrorMessage = 'Password successfully updated';

        this.http
          .put(this._url.getUrl() + 'updatepassword', userData)
          .subscribe((data: any) => {
            if (data == 1) {
            } else {
              this.correctPassword = false;
              this.incorrectPassword = false;
              this.ErrorMessage = 'Unkown error has occurred!';
            }
          });
      } else {
        this.correctPassword = false;
        this.incorrectPassword = false;
        this.ErrorMessage = 'New passwords does not match!';
      }
    } else {
      this.ErrorMessage = 'Incorrect old password!';
      this.correctPassword = false;
      this.incorrectPassword = false;
    }
  }
}
