import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PricingComponent } from './pricing/pricing.component';
import { RegisterSectorComponent } from './register-sector/register-sector.component';
import { RegisterComponent } from './register/register.component';
import { SectorComponent } from './sector/sector.component';
import { SpecialistComponent } from './specialist/specialist.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'specialists', component: SpecialistComponent },
  { path: 'sector', component: SectorComponent },
  { path: 'appointments', component: AppointmentsComponent },
  {path: 'diagnosis', component: DiagnosisComponent},
  {path: 'pricing', component: PricingComponent},
  {path: 'registersector', component: RegisterSectorComponent},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

export const routingComponents = [
  LoginComponent,
  RegisterComponent,
  HomeComponent,
  SpecialistComponent,
  PageNotFoundComponent,
  SectorComponent,
  AppointmentsComponent,
  DiagnosisComponent,
  PricingComponent,
  RegisterSectorComponent
];
