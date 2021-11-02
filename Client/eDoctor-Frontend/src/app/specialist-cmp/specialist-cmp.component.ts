import { Component, OnInit } from '@angular/core';
import { Sector } from '../models/sector';
import { BookingService } from '../services/booking.service';
import { SectorService } from '../services/sector.service';

@Component({
  selector: 'app-specialist-cmp',
  templateUrl: './specialist-cmp.component.html',
  styleUrls: ['./specialist-cmp.component.scss'],
})
export class SpecialistCMPComponent implements OnInit {
  openForm = false;
  sectors: Sector[] = [];
  constructor(
    private sector_Service: SectorService,
    private bookingServie: BookingService
  ) {}

  ngOnInit(): void {
    this.sectors = this.sector_Service.get_All_Approved_Sectors();
  }

  bookAppointment(id: string, name: string) {
    if (this.openForm == false) {
      this.openForm = true;
    } else {
      this.openForm = false;
      // this.openForm = true;
    }

    setTimeout(()=>{
      this.openForm = true;
    },50)

    this.bookingServie.setSectorID(id);
    this.bookingServie.setSector_Name(name);

  }
}
