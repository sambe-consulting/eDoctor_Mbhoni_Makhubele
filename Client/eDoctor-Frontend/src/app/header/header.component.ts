import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { Subscription } from 'rxjs';
import { ModelsService } from '../models/models.service';
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
    private usertype: UsertypeService
  ) {}

  ngOnInit() {
    this._userservice.cast.subscribe(
      (status) => (
        (this.loggedIn = status),
        console.log('On header'),
        console.log(this.loggedIn)
      )
    );

    this._userservice.userType_Cast.subscribe((type) => {
      (this.type = type), console.log('user Type:' + this.type.toString());
    });

    this._modelsService.patien_cast.subscribe((data: any) => {
      this.name = data['Name'];
    });

    this._modelsService.sector_cast.pipe().subscribe((data: any) => {
      this.name = data;
    });
  }

  logout() {
    this._userservice.updateLoginStatus(false);
    this.usertype.set(-1);
  }

  profile() {}

  ngOnDestroy() {}
}
