import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-register-sector',
  templateUrl: './register-sector.component.html',
  styleUrls: ['./register-sector.component.scss'],
})
export class RegisterSectorComponent implements OnInit {
  constructor(private _usersService: UsersService) {}

  ngOnInit(): void {}

  Register(form: NgForm) {}
}
