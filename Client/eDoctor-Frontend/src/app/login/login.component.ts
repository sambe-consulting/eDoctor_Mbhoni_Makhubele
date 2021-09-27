import { Component, ElementRef, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UserService } from '../user.service';
 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnChanges,OnInit {
  loginForm = new FormGroup({
    username: new FormControl(),
    password: new FormControl(),
  });

  user: any;
  login_url = 'http://localhost:5000/login';

  responseData: any;

  httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  loginData: any

  loginMonitor = false;
  loginErrorMessage = ''

  constructor(private http: HttpClient, private _userservice: UserService) {}

  ngOnInit(): void {
    console.log("Nwaku")
  }

  ngOnChanges(){
    console.log("Changed")
  }

  login(form: NgForm) {
      this.loginData = {
        username: form.value.username,
        password: form.value.password,
      };

    this.http.post(this.login_url, this.loginData).subscribe(
      (data:any) => {
        if(data == 1){
          this.loginMonitor = true
          this.loginErrorMessage = "Invalid password"
        }else if(data == null){
          this.loginMonitor = true;
          this.loginErrorMessage = 'A user with this email does not exist';
        }else{
          this.loginMonitor = false
          console.log(data)
          this._userservice.updateLogginStatus(false)
        }
        
      }
    );
  }
}
