import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DiagnosisComponent } from './diagnosis/diagnosis.component';
import { DirectionComponent } from './direction/direction.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewHomeCMPComponent } from './new-home-cmp/new-home-cmp.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PatientsComponent } from './patients/patients.component';
import { PricingComponent } from './pricing/pricing.component';
import { RegisterSectorComponent } from './register-sector/register-sector.component';
import { RegisterComponent } from './register/register.component';
import { SectorProfileComponent } from './sector-profile/sector-profile.component';
import { SectorComponent } from './sector/sector.component';
import { SpecialistComponent } from './specialist/specialist.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: NewHomeCMPComponent },
  { path: 'login', component: LoginComponent },
  { path: 'direction', component: DirectionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'specialists', component: SpecialistComponent },
  { path: 'sector', component: SectorComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'diagnosis', component: DiagnosisComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'users', component: PatientsComponent },
  { path: 'registersector', component: RegisterSectorComponent },
  { path: 'updateuser', component: UserProfileComponent },
  { path: 'updatesector', component: SectorProfileComponent },
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
  RegisterSectorComponent,
  UserProfileComponent,
  SectorProfileComponent,
  DirectionComponent,
  NewHomeCMPComponent
];
