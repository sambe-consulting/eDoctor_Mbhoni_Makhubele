import { HttpClient } from '@angular/common/http';
import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
} from '@angular/core';
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

  Sector_appointments: Appointment[] = [];

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
  ) {
    this.All_appointments = [];
    this.Specific_Appointments = [];
    this._All_appointments = [];
    this._Specific_Appointments = [];
  }

  ngOnInit(): void {
    this._userservice.cast.subscribe(
      (status) => (
        (this.loggedIn = status),
        console.log('On header'),
        console.log(this.loggedIn)
      )
    );

    if (this.loggedIn == true) {
      this._userservice.cast.subscribe((status) => (this.loggedIn = status));

      this.sectors = this._modelservice.getSectors(); //get all sectors, to display to all patients

      console.log('Check: ' + this.sectors.length);
      this._userservice.userType_Cast.pipe().subscribe((data: any) => {
        this.userType = data;
      });

      if (this.userType == 1) {
        //if patient logged in
        let check;
        let id = this._modelservice.getUser()?.ID_Number; //get patient id

        this._modelservice
          .getAppointments()
          .pipe()
          .subscribe((data: any[]) => {
            check = data.length;
            this.Specific_Appointments = data;

            if (this.Specific_Appointments.length == 0) {
              this.AppointmentNotEmpty = false;
            } else {
              this.AppointmentNotEmpty = true;
            }
          });

        for (var ap of this.All_appointments) {
          if (ap.PatientID == id) {
            this.Specific_Appointments.push(ap);
          }
        }
      } else if (this.userType == 3) {
        //if sector logged in
        let secID: any;
        this._userservice.sector_id_cast.pipe().subscribe((data: any) => {
          secID = data;
        });

        this._modelservice
          .getSecAppoint(secID)
          .pipe()
          .subscribe((data: any[]) => {
            this.Sector_appointments = data;
          });
      }

      /////////Get appointments

      /////////////////////////////Don't go beyond here /////////////////

      //////////////////////////////////////

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

          this._directionService.origin_Coords.next(c);

          for (var sector of this.sectors) {
            // sector.setDistance();
          }
        }
      });
    }
  }

  GetDirection(_lng: any, _lat: any) {
    let coords = {
      lng: _lng,
      lat: _lat,
    };

    this._directionService.dest_coords.next(coords);
    this.route.navigate(['direction']);
  }

  approve(id: any) {
    var data = {
      Status: '1',
    };

    this.http
      .put(this.url.getUrl() + 'updateapp/' + id, data)
      .pipe()
      .subscribe((data) => {
        //code here
      });
  }

  Cancel(id: any) {
    var data = {
      Status: '3',
    };

    this.http
      .put(this.url.getUrl() + 'updateapp/' + id, data)
      .pipe()
      .subscribe((data) => {
        //code here
      });
  }

  cancelApp(id: any) {
    var data = {
      Status: '2',
    };
    this.http
      .put(this.url.getUrl() + 'updateapp/' + id, data)
      .pipe()
      .subscribe((data) => {
        //code here
      });
  }

  Calc_distance(origin: any, destination: any) {
    // this.http.get()
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
