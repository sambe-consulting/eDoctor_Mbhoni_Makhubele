import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-specialist',
  templateUrl: './specialist.component.html',
  styleUrls: ['./specialist.component.scss'],
})
export class SpecialistComponent implements OnInit {
  userType = 1;


  constructor(private _userservice: UsersService) {}

  ngOnInit(): void {
    this._userservice.userType_Cast.subscribe((type) => (this.userType = type));
  }
}
