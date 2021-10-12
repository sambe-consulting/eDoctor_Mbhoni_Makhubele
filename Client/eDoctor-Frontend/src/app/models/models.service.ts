import { style } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { BehaviorSubject } from 'rxjs';
import { __values } from 'tslib';
import { UrlService } from '../url.service';
import { UserIDService } from '../user-id.service';
import { UsersService } from '../users.service';
import { Appointment } from './appointments';
import { Sector } from './sector';
import { Patient } from './users/patient';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  patient: Patient | undefined;
  sector: Sector | undefined;

  sectors: Sector[] = [];
  appointments: Appointment[] = [];

  lng = 0;
  lat = 0;

  current_lng: any = 0;
  current_lat: any = 0;

  private patien = new BehaviorSubject<Object>(__values);
  patien_cast = this.patien.asObservable();

  private location = new BehaviorSubject<Object>(__values);
  location_cast = this.location.asObservable();

  constructor(
    private http: HttpClient,
    private url: UrlService,
    private _userID_Service: UserIDService,
    private _userservice: UsersService
  ) {}

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

  ////////Get array of sectors
  getSectors() {
    this.http.get(this.url.getUrl() + 'sectors').subscribe((data: any) => {
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

        this.sectors.push(sector);
      }
    });
    return this.sectors;
  }

  patientCurrentLocation() {
    // var lng = '12';
    // navigator.geolocation.getCurrentPosition(function (position) {
    //   const pos = {
    //     lng: position.coords.longitude,
    //     lat: position.coords.latitude,
    //   };
    // });

    var _postion = new BehaviorSubject<any>(__values);
    var pos_cast = _postion.asObservable();

    navigator.geolocation.getCurrentPosition(function (position) {
      var loc = {
        lng: position.coords.longitude,
        lat: position.coords.latitude,
      };
      _postion.next(loc);
    });

    return pos_cast;
  }

  getSecAppoint(id: any) {
    var _appointments = new BehaviorSubject<Appointment[]>(this.appointments);
    var _app_cast = _appointments.asObservable();

    this.http
      .get(this.url.getUrl() + 'appointments/' + id)
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
            val['Address']
          );
          this.appointments.push(apmnt);
        }
        _appointments.next(this.appointments);
      });
    // return this.appointments;
    return _app_cast;
  }

  getAppointments() {
    var _appointments = new BehaviorSubject<Appointment[]>(this.appointments);
    var _app_cast = _appointments.asObservable();

    this.http
      .get(this.url.getUrl() + 'appointments/' + this._userID_Service.getID())
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
            val['Address']
          );
          this.appointments.push(apmnt);
        }
        _appointments.next(this.appointments);
      });
    // return this.appointments;
    return _app_cast;
  }
}

//  this.lng = lng;
//  this.lat = lat;
//  this.address = address;
