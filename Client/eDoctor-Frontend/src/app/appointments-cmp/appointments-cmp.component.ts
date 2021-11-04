import { Component, OnInit } from '@angular/core';
import { Appointment } from '../models/appointments';
import { AppointmentService } from '../services/appointment.service';
import { BookingService } from '../services/booking.service';

@Component({
  selector: 'app-appointments-cmp',
  templateUrl: './appointments-cmp.component.html',
  styleUrls: ['./appointments-cmp.component.scss'],
})
export class AppointmentsCMPComponent implements OnInit {
  appointment_Arr: Appointment[] = [];
  constructor(private appointment_Service: AppointmentService) {}

  ngOnInit(): void {
    this.appointment_Service
      .getAppointment()
      .pipe()
      .subscribe((data: any) => {
        this.appointment_Arr = data;
      });
  }
}
