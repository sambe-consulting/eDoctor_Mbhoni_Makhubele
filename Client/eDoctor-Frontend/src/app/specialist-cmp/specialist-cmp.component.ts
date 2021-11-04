import { Component, OnInit } from '@angular/core';
import { Sector } from '../models/sector';
import { BookingService } from '../services/booking.service';
import { SectorService } from '../services/sector.service';
import { SuccessService } from '../services/success.service';

@Component({
  selector: 'app-specialist-cmp',
  templateUrl: './specialist-cmp.component.html',
  styleUrls: ['./specialist-cmp.component.scss'],
})
export class SpecialistCMPComponent implements OnInit {
  openForm = false;

  bookingSuccess = false;
  sectors: Sector[] = [];
  constructor(
    private sector_Service: SectorService,
    private bookingServie: BookingService,
    private success: SuccessService
  ) {}

  ngOnInit(): void {
    this.sectors = this.sector_Service.get_All_Approved_Sectors();

    this.success.seccessfullyBooked_Cast.pipe().subscribe((data: any) => {
      this.openForm = data;
      if (data == true) {
        this.closeForm();
      }
    });
  }

  closeForm() {
    this.openForm = false;
    this.bookingSuccess = true;
  }

  bookAppointment(id: string, name: string) {
    this.bookingSuccess = false;
    if (this.openForm == false) {
      this.openForm = true;
    } else {
      this.openForm = false;
      // this.openForm = true;
    }

    setTimeout(() => {
      this.openForm = true;
    }, 50);

    this.bookingServie.setSectorID(id);
    this.bookingServie.setSector_Name(name);
  }
}
