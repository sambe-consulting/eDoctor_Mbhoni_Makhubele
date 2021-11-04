export class Appointment {
  id = '';
  Subject = '';
  Description = '';
  AppDate = '';
  Duration = '';
  DateCreated = '';
  Status = '';
  PatientID = '';
  SectorID = '';
  lng = 0;
  lat = 0;
  address = '';
  sector_name = '';
  patient_name = '';
  patient_middle_name = '';
  patient_surname = '';

  constructor(
    id: any,
    subject: any,
    description: any,
    appDate: any,
    duration: any,
    dateCreated: any,
    status: any,
    patientid: any,
    sectorid: any,

    lng: any,
    lat: any,
    address: any,

    sector_name: any,
    patient_name: any,
    patient_middle_name: any,
    patient_surname: any
  ) {
    this.id = id;
    this.Subject = subject;
    this.AppDate = appDate;
    this.Duration = duration;
    this.DateCreated = dateCreated;
    this.Status = status;
    this.PatientID = patientid;
    this.SectorID = sectorid;
    this.lng = lng;
    this.lat = lat;
    this.address = address;
    this.sector_name = sector_name;
    this.patient_name = patient_name;
    this.patient_middle_name = patient_middle_name;
    this.patient_surname = patient_surname;
    this.Description = description;
  }

  getDate() {
    return this.DateCreated;
  }

  getTime() {
    return this.AppDate.substring(11, 15);
  }

  getStatus() {
    if (this.Status == '0') {
      return 'Await approval';
    } else if (this.Status == '1') {
      return 'Approved';
    } else if (this.Status == '2') {
      return 'Cancelled';
    } else {
      return 'Rejected';
    }
    return null;
  }

  approved() {
    if (this.Status == '1') {
      return true;
    } else {
      return false;
    }
  }

  getClue() {
    if (this.Status == '0') {
      return true;
    } else {
      return false;
    }
  }
}
