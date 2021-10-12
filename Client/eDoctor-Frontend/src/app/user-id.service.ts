import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserIDService {
  userID = '';

  constructor() {}

  setID(id: any) {
    this.userID = id;
  }

  getID() {
    return this.userID;
  }
}
