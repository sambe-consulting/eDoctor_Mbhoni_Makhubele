import { Component, ElementRef, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ModelsService } from '../models/models.service';
import { UrlService } from '../url.service';
import { UserIDService } from '../user-id.service';
import { Appointment } from '../models/appointments';
import { CookieService } from 'ngx-cookie-service';
import { UsertypeService } from '../services/usertype.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  user: any;

  responseData: any;

  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  //////For validation
  Username = true;
  Password = true;

  /////////////////////

  loginData: any;

  loginMonitor = false;
  loginErrorMessage = '';

  LoggedIn = false;
  id = '';
  userType = -1;

  constructor(
    private http: HttpClient,
    private _userservice: UsersService,
    private route: Router,
    private _modelsService: ModelsService,
    private _url: UrlService,
    private _userID_Service: UserIDService,
    private userType_Service: UsertypeService,
    private cookie: CookieService
  ) {}

  ngOnInit() {
    this._userservice.cast.subscribe((status) => (this.LoggedIn = status));
    this._userservice.userType_Cast.subscribe((type) => (this.userType = type));
  }

  login(form: NgForm) {
    if (form.valid) {
      this.loginData = {
        username: form.value.username,
        password: form.value.password,
      };

      this.http
        .post(this._url.getUrl() + 'login', this.loginData)
        .subscribe((data: any) => {
          if (data == 1) {
            this.loginMonitor = true;
            this.loginErrorMessage = 'Invalid password';
          } else if (data == null) {
            this.loginMonitor = true;
            this.loginErrorMessage = 'A user with this email does not exist';
          } else {
            this.loginMonitor = false;
            this.id = data['ID_Number'];
            if (this.id.length != 13) {
              this._userservice.updateSectorID(this.id);
              this._modelsService._sector.next(data['Name']);
              this._modelsService.SectorLogingIn(data);
              this._userservice.updateSectorID(data['ID_Number']);
              this._userservice.updateUserType(3);
              this.cookie.set('id', this.id);
              this.userType_Service.set(3);
            } else {
              this._userservice.updateUserType(data['Type']);
              //this._modelsService.UserloggingIn(data); // I must change this one and uses subject, which is on the next line
              this._modelsService.updatePatient(data);
              this._userservice.setUserID(data['ID_Number']);
              this._userID_Service.setID(data['ID_Number']);
              this._modelsService._sector.next(data['Name']);
              this.cookie.set('id', this.id);
              this.userType_Service.set(1);
            }
            this._userservice.updateLoginStatus(true);
            this.route.navigate(['']);
          }
        });
    } else {
      if (!form.value.username) {
        this.Username = false;
      } else {
        this.Username = true;
      }

      if (!form.value.password) {
        this.Password = false;
      } else {
        this.Password = true;
      }
    }
  }
}
