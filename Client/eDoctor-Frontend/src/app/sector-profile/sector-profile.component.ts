import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModelsService } from '../models/models.service';
import { UrlService } from '../url.service';

@Component({
  selector: 'app-sector-profile',
  templateUrl: './sector-profile.component.html',
  styleUrls: ['./sector-profile.component.scss'],
})
export class SectorProfileComponent implements OnInit {
  ID_Number = ""
  Name = ""
  Owner = ""
  Website = ""
  B_Hours_Open = ""
  B_Hours_Close = ""
  Founded = ""
  Description = ""
  Consultation = ""
  Contact = ""
  Email = ""
  Aproval = ""

  Country = ""
  Street_Address = ""
  Suburb = ""
  City = ""
  Postal_Code = ""



  sector: any | undefined;
  correctPassword = true;
  incorrectPassword = false;
  ErrorMessage = '';
  constructor(
    private _modelsService: ModelsService,
    private _url: UrlService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

  }

  updateProfile(form: NgForm) {}

  updatePass(form: NgForm) {
    this.sector = this._modelsService.getSector()
    //   this.patient = this._modelsService.getUser();
    //   if (this.patient.Password == form.value.oldpassword) {
    //     if (form.value.newpassword == form.value.confirmpassword) {
    //       let userData = {
    //         ID_Number: this.patient.ID_Number,
    //         Password: form.value.newpassword,
    //       };
    //       this.incorrectPassword = true;
    //       this.correctPassword = true;
    //       this.ErrorMessage = 'Password successfully updated';
    //       this.http
    //         .put(this._url.getUrl() + 'updatepassword', userData)
    //         .subscribe((data: any) => {
    //           if (data == 1) {
    //           } else {
    //             this.correctPassword = false;
    //             this.incorrectPassword = false;
    //             this.ErrorMessage = 'Unkown error has occurred!';
    //           }
    //         });
    //     } else {
    //       this.correctPassword = false;
    //       this.incorrectPassword = false;
    //       this.ErrorMessage = 'New passwords does not match!';
    //     }
    //   } else {
    //     this.ErrorMessage = 'Incorrect old password!';
    //     this.correctPassword = false;
    //     this.incorrectPassword = false;
    //   }
    // }
  }
}
