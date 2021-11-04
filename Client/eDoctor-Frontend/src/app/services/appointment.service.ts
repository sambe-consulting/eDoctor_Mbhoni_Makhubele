import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';
import { Appointment } from '../models/appointments';
import { UrlService } from '../url.service';
import { AvailabilityService } from './availability.service';
import { BookingService } from './booking.service';
import { SuccessService } from './success.service';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  appointment_sub = new BehaviorSubject<Appointment[]>([]);
  appointment_Cast = this.appointment_sub.asObservable();
  constructor(
    private url: UrlService,
    private http: HttpClient,
    private cookie: CookieService,
    private availability: AvailabilityService,
    private success: SuccessService
  ) {}

  getAppointment() {
    var appointment_arr: Appointment[] = [];
    this.http
      .get(this.url.getUrl() + 'appointments/' + this.cookie.get('id'))
      .pipe()
      .subscribe((data: any) => {
        for (var val of data) {
          let apmnt = new Appointment(
            val['id'],
            val['Subject'],
            val['Description'],
            val['Date'],
            val['Duration'],
            val['DateCreated'],
            val['Status'],
            val['PatientID'],
            val['SpecialistID'],
            val['Lng'],
            val['Lat'],
            val['Address'],
            val['Specialist_Name'],
            val['Patient_Name'],
            val['Patient_Middle_Name'],
            val['Patient_Surname']
          );
          appointment_arr.push(apmnt);
        }
        this.appointment_sub.next(appointment_arr);
      });
    return this.appointment_Cast;
  }

  bookAppointment(data: any, time: any, date: any, sectorid: any) {
    this.http
      .post(this.url.getUrl() + 'bookappointment', data)
      .pipe()
      .subscribe((data) => {
        this.getAppointment();
        this.http
          .put(this.url.getUrl() + 'slot_taken/' + time + '/' + date, '')
          .pipe()
          .subscribe((data) => {});

        this.availability.getSectorAvailability(sectorid);

        if (data == 1) {
          this.success.successfullyBooked.next(true);
        }
      });
  }
}
