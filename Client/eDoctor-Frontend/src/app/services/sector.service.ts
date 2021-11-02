import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';
import { Sector } from '../models/sector';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root',
})
export class SectorService {
  // sectors = new BehaviorSubject<Sector[]>([]);
  // sectors_cast = this.sectors.asObservable();
  arr_sectors: Sector[] = [];
  arr_approved_sectors: Sector[] = [];
  arr_unapproved_sectors: Sector[] = [];

  constructor(private _url: UrlService, private http: HttpClient) {}

  get_All_Appointments(id: any) {
    //get sectors
  }

  get_rejected_appointments() {}

  get_approved_appointments() {}

  get_All_Sectors() {
    this.arr_sectors = [];
    this.arr_approved_sectors = [];
    this.arr_unapproved_sectors = [];
    this.http
      .get(this._url.getUrl() + 'sectors')
      .pipe()
      .subscribe((data: any) => {
        for (var val of data) {
          let sector = new Sector(
            val['ID_Number'],
            val['Name'],
            val['Owner'],
            val['Website'],
            val['Address'],
            val['Longitude'],
            val['latitude'],
            val['B_Hours_Open'],
            val['B_Hours_Close'],
            val['Founded'],
            val['Description'],
            val['isActivate'],
            val['ConsultationFee'],
            val['Contact'],
            val['Email'],
            val['Aproval'],
            val['Password']
          );
          this.arr_sectors.push(sector);
          if (sector.Approved == 1) {
            this.arr_approved_sectors.push(sector);
          }
          if (sector.Approved == 0) {
            this.arr_unapproved_sectors.push(sector);
          }
        }
      });
    // return this.arr_sectors;
  }

  get_All_Unapproved_Sectors() {
    this.get_All_Sectors();
    return this.arr_unapproved_sectors;
  }

  get_All_Approved_Sectors() {
    this.get_All_Sectors();
    return this.arr_approved_sectors;
  }
}
