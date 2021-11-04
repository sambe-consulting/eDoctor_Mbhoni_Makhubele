import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { Slot } from '../models/slot';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root',
})
export class AvailabilityService {
  availability = new BehaviorSubject<Slot[]>([]);
  availability_cast = this.availability.asObservable();

  dateController = true;

  constructor(
    private url: UrlService,
    private http: HttpClient,
    private route: Router,
    private cookie: CookieService
  ) {}

  getSlots() {
    this.http
      .get(this.url.getUrl() + 'getavailability/' + this.cookie.get('id'))
      .pipe()
      .subscribe((data: any) => {
        // this.availability.next(data);
        var arr_slots = [];
        for (var _slot of data) {
          var slot = new Slot(_slot[0], _slot[1], _slot[2], _slot[3], _slot[4]);
          arr_slots.push(slot);
        }
        this.availability.next(arr_slots);
      });

    return this.availability_cast;
  }

  getSectorAvailability(id: any) {
    this.http
      .get(this.url.getUrl() + 'getavailability/' + id)
      .pipe()
      .subscribe((data: any) => {
        // this.availability.next(data);
        var arr_slots = [];
        for (var _slot of data) {
          var slot = new Slot(_slot[0], _slot[1], _slot[2], _slot[3], _slot[4]);
          arr_slots.push(slot);
        }
        this.availability.next(arr_slots);
      });

    return this.availability_cast;
  }

  getDateController() {
    return this.dateController;
  }

  setDateController(value: boolean) {
    this.dateController = value;
  }
}
