import { DoCheck, Input, OnChanges, SimpleChanges } from '@angular/core';
import { KeyValueDiffer } from '@angular/core';
import { KeyValueDiffers } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { Slot } from '../models/slot';
import { AppointmentService } from '../services/appointment.service';
import { AvailabilityService } from '../services/availability.service';
import { BookingService } from '../services/booking.service';
import { SuccessService } from '../services/success.service';

@Component({
  selector: 'app-booking-cmp',
  templateUrl: './booking-cmp.component.html',
  styleUrls: ['./booking-cmp.component.scss'],
  inputs: ['slotDate'],
})
export class BookingCMPComponent implements OnInit, DoCheck, OnChanges {
  @Input() slotDate = '';
  minDate = '';
  sector_Name = '';
  sectorid = '';
  slots: Slot[] = [];
  filtered_Slots: Slot[] = [];
  differ: KeyValueDiffer<string, any>;
  selectedDate = new BehaviorSubject<string>(this.minDate);
  select_Date_Cast = this.selectedDate.asObservable();
  formValid = true;



  choosenSlot = '...';
  SlotChoosen = true;
  constructor(
    private booking: BookingService,
    private availability: AvailabilityService,
    private differs: KeyValueDiffers,
    private cookie: CookieService,
    private appointment: AppointmentService,
    private success: SuccessService
  ) {
    this.differ = this.differs.find({}).create();
  }

  ngOnInit(): void {
    var date = new Date().getDate().toString();
    if (new Date().getDate() < 9) {
      date = '0' + date;
    }
    var month = new Date().getUTCMonth();
    var year = new Date().getFullYear();
    this.minDate = year + '-' + (month + 1) + '-' + date;
    this.slotDate = year + '-' + (month + 1) + '-' + date;
    this.sector_Name = this.booking.getSector_Name();

    this.sectorid = this.booking.getSectorID();

    this.availability
      .getSectorAvailability(this.sectorid)
      .pipe()
      .subscribe((data: any) => {
        this.slots = data;
        this.filtered_Slots = [];
        for (var slot of this.slots) {
          if (slot.date == this.slotDate && slot.status == 0) {
            this.filtered_Slots.push(slot);
          }
        }
      });
  }

  SelectSlot(time: any) {
    this.choosenSlot = time;
    this.SlotChoosen = true;
  }

  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log('Joe');
  }

  ngDoCheck() {
    this.filtered_Slots = [];
    for (var slot of this.slots) {
      if (slot.date == this.slotDate && slot.status == 0) {
        this.filtered_Slots.push(slot);
      }
    }
  }

  Submit(form: NgForm) {
    if (!form.valid) {
      this.formValid = false;
    }

    if (this.choosenSlot == '...') {
      this.SlotChoosen = false;
    }

    if (form.valid && this.choosenSlot != '...') {
      var data = {
        Subject: 'None',
        Description: form.value.reason,
        Date: this.slotDate + ' ' + this.choosenSlot,
        Duration: '1',
        Patient_ID: this.cookie.get('id'),
        Specialist_ID: this.booking.getSectorID().toString(),
      };

      this.appointment.bookAppointment(
        data,
        this.choosenSlot,
        this.slotDate,
        this.booking.getSectorID()
      );
    }



    setTimeout(() => {
      this.formValid = true;
    }, 3000);
  }
}
