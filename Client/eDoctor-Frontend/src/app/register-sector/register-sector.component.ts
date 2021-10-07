import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModelsService } from '../models/models.service';

@Component({
  selector: 'app-register-sector',
  templateUrl: './register-sector.component.html',
  styleUrls: ['./register-sector.component.scss'],
})
export class RegisterSectorComponent implements OnInit {
  constructor(
    private _usersService: UsersService,
    private http: HttpClient,
    private route: Router,
    private _modelsService: ModelsService
  ) {}
  sectorData: any;
  url = 'http://localhost:5000/registersector';

  registerMonitor = false;
  registerErrorMessage = '';

  passwordMatch = true;

  // form validation variables
  Name = true;
  Ownwer = true;
  Website = true;
  B_Hours_Open = true;
  B_Hours_Close = true;
  Founded = true;
  Description = true;
  ConsulationFee = true;
  Contact = true;
  Email = true;
  Password = true;
  Confirmpassword = true;
  Country = true;
  Street_Address = true;
  Suburb = true;
  City = true;
  Postal_COde = true;
  ngOnInit(): void {}

  Register(form: NgForm) {
    if (form.valid) {
      this.sectorData = {
        Name: form.value.name,
        Owner: form.value.owner,
        Website: form.value.website,
        Address: 'No longer usefull',
        Longitude: this._modelsService.getLng().toString(),
        latitude: this._modelsService.getLat().toString(),
        B_Hours_Open: form.value.openTime,
        B_Hours_Close: form.value.closeTime,
        Founded: form.value.founded,
        Description: form.value.Description,
        ConsultationFee: '250',
        Contact: form.value.contact,
        Email: form.value.email,
        Password: form.value.password,
        Country: form.value.country,
        Street_Address: form.value.streetaddress,
        Suburb: form.value.suburb,
        City: form.value.city,
        Postal_Code: form.value.postalcode,
      };

      if (form.value.password == form.value.confirmpassword) {
        this.http.post(this.url, this.sectorData).subscribe((data: any) => {
          if (data['code'] == 0) {
            this.registerMonitor = true;
            this.registerErrorMessage = 'Identity number already exist';
          } else if (data['code'] == 1) {
            //redirect to login
            this.route.navigate(['/login']);
            this.passwordMatch = false;
          } else {
            this.registerMonitor = false;
            console.log(data);
          }
        });
      } else {
        this.passwordMatch = false;

        this.Name = true;
        this.Ownwer = true;
        this.Website = true;
        this.B_Hours_Open = true;
        this.B_Hours_Close = true;
        this.Founded = true;
        this.Description = true;
        this.ConsulationFee = true;
        this.Contact = true;
        this.Email = true;
        this.Password = true;
        this.Confirmpassword = true;
        this.Country = true;
        this.Street_Address = true;
        this.Suburb = true;
        this.City = true;
        this.Postal_COde = true;
      }
    } else {
      if (!form.value.name) {
        this.Name = false;
      } else {
        this.Name = true;
      }

      if (!form.value.owner) {
        this.Ownwer = false;
      } else {
        this.Ownwer = true;
      }

      if (!form.value.website) {
        this.Website = false;
      } else {
        this.Website = true;
      }

      if (!form.value.openTime) {
        this.B_Hours_Open = false;
      } else {
        this.B_Hours_Open = true;
      }

      if (!form.value.closeTime) {
        this.B_Hours_Close = false;
      } else {
        this.B_Hours_Close = true;
      }

      if (!form.value.founded) {
        this.Founded = false;
      } else {
        this.Founded = true;
      }

      if (!form.value.Description) {
        this.Description = false;
      } else {
        this.Description = true;
      }

      if (!form.value.contact) {
        this.Contact = false;
      } else {
        this.Contact = true;
      }

      if (!form.value.email) {
        this.Email = false;
      } else {
        this.Email = true;
      }

      if (!form.value.password) {
        this.Password = false;
      } else {
        this.Password = true;
      }

      if (!form.value.confirmpassword) {
        this.Confirmpassword = false;
      } else {
        this.Confirmpassword = true;
      }

      if (!form.value.country) {
        this.Country = false;
      } else {
        this.Country = true;
      }

      if (!form.value.streetaddress) {
        this.Street_Address = false;
      } else {
        this.Street_Address = true;
      }

      if (!form.value.suburb) {
        this.Suburb = false;
      } else {
        this.Suburb = true;
      }

      if (!form.value.city) {
        this.City = false;
      } else {
        this.City = true;
      }

      if (!form.value.postalcode) {
        this.Postal_COde = false;
      } else {
        this.Postal_COde = true;
      }
    }
  }
}
