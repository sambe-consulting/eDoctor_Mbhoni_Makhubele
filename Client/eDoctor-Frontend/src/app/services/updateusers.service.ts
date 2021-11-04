import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UpdateusersService {
  updateState = new BehaviorSubject<boolean>(true);
  updateState_Cast = this.updateState.asObservable();

  constructor() {}
}
