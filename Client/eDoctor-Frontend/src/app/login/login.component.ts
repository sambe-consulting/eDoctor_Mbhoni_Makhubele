import { Component, ElementRef, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ModelsService } from '../models/models.service';
import { UrlService } from '../url.service';

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
    private _url: UrlService
  ) {}

  ngOnInit() {
    this._userservice.cast.subscribe((status) => (this.LoggedIn = status));
    this._userservice.userType_Cast.subscribe((type) => (this.userType = type));
  }

  login(form: NgForm) {
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
            console.log('Its sector');
            this._modelsService.SectorLogingIn(data);
            this._userservice.updateSectorID(data['ID_Number']);
            this._userservice.updateUserType(3);
          } else {
            this._userservice.updateUserType(data['Type']);
            //this._modelsService.UserloggingIn(data); // I must change this one and uses subject, which is on the next line
            this._modelsService.updatePatient(data);
            console.log('Its user');
          }
          console.log(this.id.length);
          console.log(this.userType);
          this._userservice.updateLoginStatus(true);
          this.route.navigate(['']);
        }
      });
  }
}
