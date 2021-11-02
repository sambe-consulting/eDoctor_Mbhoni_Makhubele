import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { enableRipple } from '@syncfusion/ej2-base';
import { Slot } from '../models/slot';
import { AvailabilityService } from '../services/availability.service';
import { UrlService } from '../url.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.component.html',
  styleUrls: ['./availability.component.scss'],
})
export class AvailabilityComponent implements OnInit {
  minDate = '';
  slot_date = '';
  time = { hour: 13, minute: 30 };
  public value: Date = new Date(2000, 2, 10, 10, 30, 0);

  subscription: any;

  slots: Slot[] = [];
  filtered_slots: Slot[] = [];
  constructor(
    private availability: AvailabilityService,
    private route: Router,
    private http: HttpClient,
    private url: UrlService,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    if (this.availability.getDateController() == true) {
      var date = new Date().getDate().toString();
      if (new Date().getDate() < 9) {
        date = '0' + date;
      }

      var month = new Date().getUTCMonth();
      var year = new Date().getFullYear();
      this.minDate = year + '-' + (month + 1) + '-' + date;
      this.slot_date = year + '-' + (month + 1) + '-' + date;
      this.getSlots(this.slot_date);
    } else {
      this.getSlots(this.slot_date);
    }
  }

  getSlots(date: any) {
    this.availability
      .getSlots()
      .pipe()
      .subscribe((data: any) => {
        this.slots = [];
        this.slots = data;
        this.filter_slots(date);
      });
  }

  filter_slots(date: any) {
    this.filtered_slots = [];
    for (var slot of this.slots) {
      if (slot.date == date) {
        this.filtered_slots.push(slot);
      }
    }
  }

  AddSlot(slotForm: NgForm) {
    this.AddSlots(slotForm);
    // this.getSlots();
    // window.location.reload();
  }

  AddSlots(form: NgForm) {
    var minutes = '';
    if (form.value.time['minute'] == 0) {
      minutes = form.value.time['minute'] + '0';
    } else if (form.value.time['minute'] < 10) {
      minutes = '0' + form.value.time['minute'];
    } else {
      minutes = form.value.time['minute'];
    }
    var time = form.value.time['hour'] + ':' + minutes;

    var data = {
      time: time,
      date: form.value.date,
      sectorid: this.cookie.get('id'),
    };

    this.http
      .post(this.url.getUrl() + 'addavailability', data)
      .pipe()
      .subscribe((data) => {
        this.availability.setDateController(false);
        this.ngOnInit();
      });
  }

  delete_slot(id: any) {
    this.http
      .delete(this.url.getUrl() + 'removeslot/' + id)
      .pipe()
      .subscribe((data) => {
        this.getSlots(this.slot_date);
      });
  }
}
