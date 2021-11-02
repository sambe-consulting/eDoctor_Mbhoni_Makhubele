import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SpecialistComponent } from './specialist/specialist.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SectorComponent } from './sector/sector.component';
import { HeaderComponent } from './header/header.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { PricingComponent } from './pricing/pricing.component';
import { RegisterSectorComponent } from './register-sector/register-sector.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SectorProfileComponent } from './sector-profile/sector-profile.component';
import { MapComponent } from './map/map.component';
import { DirectionComponent } from './direction/direction.component';
import { PatientsComponent } from './patients/patients.component';
import { SectorsComponent } from './sectors/sectors.component';
import { SectorsOnMapComponent } from './sectors-on-map/sectors-on-map.component';
import { SpecialistCMPComponent } from './specialist-cmp/specialist-cmp.component';
import { AppointmentsCMPComponent } from './appointments-cmp/appointments-cmp.component';
import { NewHomeCMPComponent } from './new-home-cmp/new-home-cmp.component';
import { BookingCMPComponent } from './booking-cmp/booking-cmp.component';
import { AppointmentOnSpecialistComponent } from './appointment-on-specialist/appointment-on-specialist.component';
import { AvailabilityComponent } from './availability/availability.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';





@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent,
    // RegisterComponent,
    // SpecialistComponent,
    // HomeComponent
    routingComponents,
    PageNotFoundComponent,
    SectorComponent,
    HeaderComponent,
    AppointmentsComponent,
    DiagnosisComponent,
    PricingComponent,
    RegisterSectorComponent,
    UserProfileComponent,
    SectorProfileComponent,
    MapComponent,
    DirectionComponent,
    PatientsComponent,
    SectorsComponent,
    SectorsOnMapComponent,
    SpecialistCMPComponent,
    AppointmentsCMPComponent,
    NewHomeCMPComponent,
    BookingCMPComponent,
    AppointmentOnSpecialistComponent,
    AvailabilityComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    DateInputsModule,
    BrowserAnimationsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
