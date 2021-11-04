import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UpdateusersService } from '../services/updateusers.service';
import { UsertypeService } from '../services/usertype.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-new-home-cmp',
  templateUrl: './new-home-cmp.component.html',
  styleUrls: ['./new-home-cmp.component.scss'],
})
export class NewHomeCMPComponent implements OnInit {
  usertype = '-1';
  loggin = false;
  constructor(
    private cookie: CookieService,
    private userType: UsertypeService,
    private userservice: UsersService,
    private UpdateState: UpdateusersService
  ) {}

  ngOnInit(): void {
    this.usertype = this.userType.get_type();

    // this.userservice.cast.pipe().subscribe((data) => {
    //   this.loggin = data;
    // });

    this.UpdateState.updateState_Cast.pipe().subscribe((data) => {
      this.usertype = this.cookie.get('type');

      if (this.cookie.get('loggedin') == 'true') {
        this.loggin = true;
      } else {
        this.loggin = false;
      }
    });

    this.usertype = this.cookie.get('type');

    if (this.cookie.get('loggedin') == 'true') {
      this.loggin = true;
    } else {
      this.loggin = false;
    }
  }
}
