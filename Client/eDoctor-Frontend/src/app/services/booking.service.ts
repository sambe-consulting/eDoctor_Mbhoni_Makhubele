import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  name = '';
  sectorid = '';
  constructor() {}

  setSector_Name(name: any) {
    this.name = name;
  }

  getSector_Name() {
    return this.name;
  }

  setSectorID(id: any) {
    this.sectorid = id;
  }

  getSectorID() {
    return this.sectorid;
  }


}
