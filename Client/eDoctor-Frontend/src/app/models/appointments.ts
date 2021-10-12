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
    address: any
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
  }

  getDate() {
    return this.AppDate.substring(0, 10);
  }

  getTime() {
    return this.AppDate.substring(11, 19);
  }
}
