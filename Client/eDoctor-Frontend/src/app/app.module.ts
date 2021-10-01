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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
