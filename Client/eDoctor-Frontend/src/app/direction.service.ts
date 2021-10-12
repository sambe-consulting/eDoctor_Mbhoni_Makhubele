import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  coords = new BehaviorSubject<Object>(__values);
  coords_cast = this.coords.asObservable();

  sourceCoords = new BehaviorSubject<Object>(__values);
  sourceCoords_cast = this.sourceCoords.asObservable();

  constructor() {}
}
