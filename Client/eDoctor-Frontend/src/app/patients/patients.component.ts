import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Patient } from '../models/users/patient';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent implements OnInit {
  patients: Patient[] = [];
  length = 0;
  constructor(private http: HttpClient, private _url: UrlService) {}

  ngOnInit(): void {
    let patients;
    this.http.get(this._url.getUrl() + 'users').subscribe((data: any) => {
      for (var user of data['Users']) {
        if (user['Type'] == 1) {
          var patient = new Patient(
            user['ID_Number'],
            user['Name'],
            user['Middle_Name'],
            user['Surname'],
            user['Contact'],
            user['Email'],
            user['Password'],
            user['DOB'],
            user['Gender'],
            user['Type'],
            user['Signup_Date'],
            user['Reset_Code']
          );
          this.patients.push(patient);
        }
      }
      this.length = this.patients.length;
    });
  }
}
