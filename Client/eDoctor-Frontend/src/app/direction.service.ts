import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';

@Injectable({
  providedIn: 'root',
})
export class DirectionService {
  dest_coords = new BehaviorSubject<Object>(__values);
  dest_coords_cast = this.dest_coords.asObservable();

  origin_Coords = new BehaviorSubject<Object>(__values);
  origin_Coords_cast = this.origin_Coords.asObservable();

  constructor() {}
}
