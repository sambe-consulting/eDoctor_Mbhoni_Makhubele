import { Injectable } from '@angular/core';
import { Appointment } from './models/appointments';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  url = 'http://localhost:5000/';
  appointment: Appointment[] = [];

  constructor() {}

  getUrl() {
    return this.url;
  }
}
