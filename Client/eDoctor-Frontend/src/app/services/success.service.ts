import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuccessService {
  successfullyBooked = new BehaviorSubject<Boolean>(false);
  seccessfullyBooked_Cast = this.successfullyBooked.asObservable();
  constructor() {}
}
