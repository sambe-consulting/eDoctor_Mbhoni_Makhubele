export class Sector {
  id = '';
  Name = '';
  Founder = '';
  Website = '';
  Address = '';
  Longitude = '';
  Latitude = '';
  B_Hours_Open = '';
  B_Hours_Close = '';
  Founded = '';
  Description = '';
  isActive = '';
  ConsultationFee: any = 0;
  Contact = '';
  Email = '';
  Approved = 0;
  Password = '';
  distance = 0;
  constructor(
    id: string,
    Name: string,
    Founder: string,
    Website: string,
    Address: string,
    Longitude: string,
    Latitude: string,
    B_Hours_Open: string,
    B_Hours_Close: string,
    Founded: string,
    Description: string,
    isActive: string,
    ConsultationFee: any = 0,
    Contact: string,
    Email: string,
    Approved: number,
    Password: string
  ) {
    this.id = id;
    this.Name = Name;
    this.Founder = Founder;
    this.Website = Website;
    this.Address = Address;
    this.Longitude = Longitude;
    this.Latitude = Latitude;
    this.B_Hours_Open = B_Hours_Open;
    this.B_Hours_Close = B_Hours_Close;
    this.Founded = Founded;
    this.Description = Description;
    this.isActive = isActive;
    this.ConsultationFee = ConsultationFee;
    this.Contact = Contact;
    this.Email = Email;
    this.Approved = Approved;
    this.Password = Password;
  }

  setDistance(distance: number) {
    this.distance = distance;
  }

  getDistance() {
    return this.distance;
  }
}
