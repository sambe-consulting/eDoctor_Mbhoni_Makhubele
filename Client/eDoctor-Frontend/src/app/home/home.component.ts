import { Component, OnInit } from '@angular/core';
import { ModelsService } from '../models/models.service';
import { Sector } from '../models/sector';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  loggedIn = false;

  nAppointments = false;

  sectors: Sector[] = [];

  currentLoc: any[] = [];
  constructor(
    private _userservice: UsersService,
    private _modelservice: ModelsService
  ) {}

  ngOnInit(): void {
    this._userservice.cast.subscribe((status) => (this.loggedIn = status));
    this.sectors = this._modelservice.getSectors();
    // let lng = this._modelservice.patientCurrentLocation();
    console.log(this._modelservice.patientCurrentLocation());
  }
}
