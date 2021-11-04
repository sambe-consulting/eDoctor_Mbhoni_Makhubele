import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { Subscription } from 'rxjs';
import { ModelsService } from '../models/models.service';
import { UpdateusersService } from '../services/updateusers.service';
import { UsertypeService } from '../services/usertype.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn = false;
  type = -1;

  name = '';

  constructor(
    private _userservice: UsersService,
    private _modelsService: ModelsService,
    private cookie: CookieService,
    private usertype: UsertypeService,
    private updateState: UpdateusersService,
    private route: Router
  ) {}

  ngOnInit() {
    this.updateState.updateState_Cast.pipe().subscribe((data: any) => {
      if (this.cookie.get('loggedin') == 'true') {
        this.loggedIn = true;
      } else if (this.cookie.get('loggedin') == 'false') {
        this.loggedIn = false;
      }

      this.type = Number(this.cookie.get('type'));

      this.name = this.cookie.get('name');

      console.log('Logged Out');
    });

    if (this.cookie.get('loggedin') == 'true') {
      this.loggedIn = true;
    }

    this.type = Number(this.cookie.get('type'));

    this.name = this.cookie.get('name');
  }

  logout() {
    // this._userservice.updateLoginStatus(false);
    // this.usertype.set(-1);

    this.cookie.set('type', '-1');
    this.cookie.set('loggedin', 'false');

    this.updateState.updateState.next(false);
    // this.route.navigate(['']);
  }

  profile() {}

  ngOnDestroy() {}
}
