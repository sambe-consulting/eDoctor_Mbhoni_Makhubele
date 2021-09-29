import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  loggedIn = false;

  constructor(private _userservice: UsersService) {}

  ngOnInit() {
    this._userservice.cast.subscribe(
      (status) => (
        (this.loggedIn = status),
        console.log('On header'),
        console.log(this.loggedIn)
      )
    );
  }

  ngOnDestroy() {}
}
