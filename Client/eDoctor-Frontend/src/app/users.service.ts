import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private user = new BehaviorSubject<boolean>(false);
  cast = this.user.asObservable();

  private userType = new BehaviorSubject<number>(1);
  userType_Cast = this.userType.asObservable();

  private sector_id = new BehaviorSubject<string>('');
  sector_id_cast = this.sector_id.asObservable();

  private user_Type_Registration = new BehaviorSubject<number>(0);
  user_Type_Registration_Cast = this.user_Type_Registration.asObservable();


  constructor() {}

  updateLoginStatus(status: boolean) {
    this.user.next(status);
  }

  updateUserType(new_userType: number) {
    this.userType.next(new_userType);
  }

  updateSectorID(new_sectorID: string) {
    this.sector_id.next(new_sectorID);
  }

  updateUserTypeRegistration_Update(new_Reg_Type: number) {
    this.user_Type_Registration.next(new_Reg_Type);
  }



  getUserType() {}
}
