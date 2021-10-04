import { Injectable } from '@angular/core';
import { Sector } from './sector';
import { Patient } from './users/patient';

@Injectable({
  providedIn: 'root',
})
export class ModelsService {
  patient: Patient | undefined;
  sector: Sector | undefined;

  constructor() {}

  UserloggingIn(data: any) {
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

    console.log(this.patient.DOB)
  }

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

  getSector() {}

  getAdmin() {}
}
