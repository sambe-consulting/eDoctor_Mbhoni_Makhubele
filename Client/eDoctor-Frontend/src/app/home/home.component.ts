import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { map } from 'rxjs';
import { map } from 'rxjs/operators';
import { DirectionService } from '../direction.service';
import { Appointment } from '../models/appointments';
import { ModelsService } from '../models/models.service';
import { Sector } from '../models/sector';
import { UrlService } from '../url.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedIn = false;

  All_appointments: Appointment[] = [];
  Specific_Appointments: Appointment[] = [];
  AppointmentNotEmpty = true;

  _All_appointments: Appointment[] = [];
  _Specific_Appointments: Appointment[] = [];

  sectors: Sector[] = [];
  newSectors: Sector[] = [];

  currentLoc: any[] = [];

  distance: any;

  userType: any;

  constructor(
    private _userservice: UsersService,
    private _modelservice: ModelsService,
    private http: HttpClient,
    private url: UrlService,
    private _directionService: DirectionService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this._userservice.cast.subscribe((status) => (this.loggedIn = status));
    this.sectors = this._modelservice.getSectors();

    this._userservice.userType_Cast.pipe().subscribe((data: any) => {
      this.userType = data;
    });

    let secID: any;
    this._userservice.sector_id_cast.pipe().subscribe((data: any) => {
      secID = data;
    });

    /////////Get appointments

    let check;
    let id = this._modelservice.getUser()?.ID_Number;
    this._modelservice
      .getAppointments()
      .pipe()
      .subscribe((data: any[]) => {
        console.log(data);
        check = data.length;
        this.Specific_Appointments = data;

        if (this.Specific_Appointments.length == 0) {
          this.AppointmentNotEmpty = false;
        } else {
          this.AppointmentNotEmpty = true;
        }
      });

    this._modelservice
      .getSecAppoint(secID)
      .pipe()
      .subscribe((data: any[]) => {
        this.All_appointments = data;

      });

    console.log('Here:' + check);

    for (var ap of this.All_appointments) {
      if (ap.PatientID == id) {
        this.Specific_Appointments.push(ap);
      }
    }

    console.log('This is id: ' + this.All_appointments.length);

    this._modelservice.patientCurrentLocation().subscribe((data) => {
      this.currentLoc.push(data);
      if (this.currentLoc.length == 2) {
        console.log(console.log(this.currentLoc[1]));

        if (typeof this.currentLoc[1] == null) {
          console.log('Haa fok');
        }

        //user location
        var userlng = this.currentLoc[1]['lng'];
        var userlat = this.currentLoc[1]['lat'];

        let c = {
          lng: userlng,
          lat: userlat,
        };

        this._directionService.sourceCoords.next(c);

        // for (var sector of this.sectors) {
        //   this.http
        //     .get(
        //       'https://api.mapbox.com/directions/v5/mapbox/driving/' +
        //         userlng +
        //         ',' +
        //         userlat +
        //         ';' +
        //         sector.Longitude +
        //         ',' +
        //         sector.Latitude +
        //         '?geometries=geojson&access_token=pk.eyJ1IjoibWJob25pNTU4NSIsImEiOiJja3VjeGRncGkxNHRwMnVtdjdzaGsyZG5uIn0.A4zZliHtCuE0Oq-0JKq7Kw'
        //     )
        //     .subscribe((data: any) => {
        //       //console.log("Joe: " + data['routes'][0]['distance']);

        //       this.distance = parseFloat(
        //         (data['routes'][0]['distance'] / 1000).toString()
        //       ).toFixed(1);

        //       sector.setDistance(this.distance);

        //       console.log(sector.getDistance());
        //     });
        // }

        for (var sector of this.sectors) {
          sector.setDistance(
            this.Calc_distance(
              userlat,
              sector.Latitude,
              sector.Longitude,
              userlng
            )
          );
        }
        console.log(
          this.Calc_distance(
            userlat,
            this.sectors[3].Latitude,
            this.sectors[3].Longitude,
            userlng
          )
        );
      }
    });
  }

  GetDirection(_lng: any, _lat: any) {
    let coords = {
      lng: _lng,
      lat: _lat,
    };

    this._directionService.coords.next(coords);
    this.route.navigate(['direction']);
  }

  Calc_distance(lat1: any, lat2: any, lon1: any, lon2: any) {
    // The math module contains a function
    // named toRadians which converts from
    // degrees to radians.
    lon1 = (lon1 * Math.PI) / 180;
    lon2 = (lon2 * Math.PI) / 180;
    lat1 = (lat1 * Math.PI) / 180;
    lat2 = (lat2 * Math.PI) / 180;

    // Haversine formula
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a =
      Math.pow(Math.sin(dlat / 2), 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

    let c = 2 * Math.asin(Math.sqrt(a));

    // Radius of earth in kilometers. Use 3956
    // for miles
    // let r = 6371;
    let r = 3956;

    // calculate the result
    return c * r;
  }

  BookAppointment(SectorID: any) {
    // console.log(id);

    let patientID = this._modelservice.getUser()?.ID_Number;
    console.log('User ID: ' + patientID);
    console.log('Sector: ' + SectorID);

    //bookappointment

    ///Here I need to I need to make post
    let today = new Date().toLocaleDateString();
    let appointmentData = {
      Subject: 'None',
      Description: 'None',
      Date: today,
      Duration: '1',
      Patient_ID: patientID?.toString(),
      Specialist_ID: SectorID,
    };

    this.http
      .post(this.url.getUrl() + 'bookappointment', appointmentData)
      .subscribe((data) => {
        console.log(data);
      });
  }
}
