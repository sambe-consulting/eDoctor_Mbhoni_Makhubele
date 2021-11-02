import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class UsertypeService {
  constructor(private cookie: CookieService, private route: Router) {
    this.cookie.set('usertype', '-1');
  }

  set(usertype: any) {
    this.cookie.set('usertype', usertype);
  }

  get_type() {
    return this.cookie.get('usertype');
  }
}
