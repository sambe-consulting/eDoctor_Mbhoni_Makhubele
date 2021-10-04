import { User } from './user';

export class Patient extends User {
  longitude = -12.434344;
  tatitude = 17.43454;

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
    super(
      Id,
      name,
      m_name,
      surname,
      contact,
      email,
      password,
      dob,
      gender,
      type,
      signd,
      reset_code
    );
  }
}
