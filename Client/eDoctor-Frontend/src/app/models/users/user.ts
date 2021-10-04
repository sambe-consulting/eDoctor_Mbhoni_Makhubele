export class User {
  ID_Number = '';
  Name = '';
  M_Name = '';
  Surname = '';
  Contact = '';
  Email = '';
  Password = '';
  DOB = '';
  Gender = '';
  Type = 0;
  Signup_Date = "";
  Reset_code = '';
  constructor(
    Id: string,
    name: string,
    m_name: string,
    surname: string,
    contact: string,
    email: string,
    password: string,
    dob: string,
    gender: string,
    type: number,
    signd: string,
    reset_code: string
  ) {
    this.ID_Number = Id,
    this.Name = name,
    this.M_Name = m_name,
    this.Surname = surname,
    this.Contact = contact,
    this.Email = email,
    this.Password = password,
    this.DOB = dob,
    this.Gender = gender,
    this.Type = type,
    this.Signup_Date = signd,
    this.Reset_code = reset_code
  }
}
