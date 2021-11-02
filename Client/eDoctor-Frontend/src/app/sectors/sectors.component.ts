import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../url.service';
import { Sector } from '../models/sector';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss'],
})
export class SectorsComponent implements OnInit {
  sectors: Sector[] = [];
  length = 0;
  constructor(private http: HttpClient, private _url: UrlService) {}

  ngOnInit(): void {
    this.http.get(this._url.getUrl() + 'sectors').subscribe((data: any) => {
      for (var _data of data) {
        var patient = new Sector(
          _data['ID_Number'],
          _data['Name'],
          _data['Owner'],
          _data['Website'],
          _data['Address'],
          _data['Longitude'],
          _data['Latitude'],
          _data['B_Hours_Open'],
          _data['B_Hours_Close'],
          _data['Founded'],
          _data['Description'],
          _data['isActivate'],
          _data['ConsultationFee'],
          _data['Contact'],
          _data['Email'],
          _data['Aproval'],
          _data['Password']
        );
        this.sectors.push(patient);
      }
      this.length = this.sectors.length;
    });
  }
}
