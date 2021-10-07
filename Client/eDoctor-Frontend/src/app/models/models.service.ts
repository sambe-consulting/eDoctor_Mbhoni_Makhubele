import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';
import { Sector } from './sector';
import { Patient } from './users/patient';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  patient: Patient | undefined;
  sector: Sector | undefined;

  lng = 0;
  lat = 0;

  private patien = new BehaviorSubject<Object>(__values);
  patien_cast = this.patien.asObservable();

  constructor() {}

  updatePatient(data: any) {
    this.patien.next(data);
    this.patient = new Patient(
      data['ID_Number'],
      data['Name'],
      data['Middle_Name'],
      data['Surname'],
      data['Contact'],
      data['Email'],
      data['Password'],
      data['DOB'],
      data['Gender'],
      data['Type'],
      data['Signup_Date'],
      data['Reset_Code']
    );
  }

  // UserloggingIn(data: any) {
  //   this.patient = new Patient(
  //     data['ID_Number'],
  //     data['Name'],
  //     data['Middle_Name'],
  //     data['Surname'],
  //     data['Contact'],
  //     data['Email'],
  //     data['Password'],
  //     data['DOB'],
  //     data['Gender'],
  //     data['Type'],
  //     data['Signup_Date'],
  //     data['Reset_Code']
  //   );
  // }

  getUser() {
    return this.patient;
  }

  SectorLogingIn(data: any) {
    this.sector = new Sector(
      data['ID_Number'],
      data['Name'],
      data['Owner'],
      data['Website'],
      data['Address'],
      data['Longitude'],
      data['Latitude'],
      data['B_Hours_Open'],
      data['B_Hours_Close'],
      data['Founded'],
      data['Description'],
      data['isActivate'],
      data['ConsultationFee'],
      data['Contact'],
      data['Email'],
      data['Aproval'],
      data['Password']
    );
  }

  setLocation(lng: any, lat: any) {
    this.lat = lat;
    this.lng = lng;
  }

  getLat() {
    return this.lat;
  }

  getLng() {
    return this.lng;
  }

  getSector() {}

  getAdmin() {}
}
