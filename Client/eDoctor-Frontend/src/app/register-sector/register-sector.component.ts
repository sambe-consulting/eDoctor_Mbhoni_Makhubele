import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-sector',
  templateUrl: './register-sector.component.html',
  styleUrls: ['./register-sector.component.scss'],
})
export class RegisterSectorComponent implements OnInit {
  constructor(private _usersService: UsersService, private http: HttpClient) {}
  sectorData: any;
  url = 'http://localhost:5000/registersector';

  registerMonitor = false;
  registerErrorMessage = '';

  ngOnInit(): void {
    console.log('Hey');
  }

  Register(form: NgForm) {
    this.sectorData = {
      Name: form.value.name,
      Owner: form.value.owner,
      Website: form.value.website,
      Address: form.value.address,
      Longitude: "23.34342",
      latitude: "12.444994",
      B_Hours_Open: form.value.openTime,
      B_Hours_Close: form.value.closeTime,
      Founded: form.value.founded,
      Description: form.value.Description,
      ConsultationFee: "250",
      Contact: form.value.contact,
      Email: form.value.email,
      Password: form.value.password,
    };

    this.http.post(this.url, this.sectorData).subscribe((data: any) => {
      if (data['code'] == 0) {
        this.registerMonitor = true;
        this.registerErrorMessage = 'Identity number already exist';
      } else if (data['code'] == 1) {
        //redirect to login
        console.log("I'm in");
      } else {
        this.registerMonitor = false;
        console.log(data);
      }
    });
  }
}
