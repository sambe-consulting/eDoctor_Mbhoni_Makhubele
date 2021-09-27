import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
  userType: number = 1;
  notLoggedIn = false;

  updateUserType(type: number) {
    this.userType = type;
  }

  getUserType() {
    return this.userType;
  }

  updateLogginStatus(status: boolean) {
    this.notLoggedIn = status;
  }

  getLogginStatus() {
    return this.notLoggedIn;
  }
}
