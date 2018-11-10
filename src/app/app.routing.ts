import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { HomeComponent } from '../app/home/home.component';
import { RegistrationsComponent } from '../app/registrations/registrations.component';
import { FeeComponent } from '../app/fee/fee.component';
import { BusesDashboardComponent } from '../app/buses-dashboard/buses-dashboard.component';
// import { PassengersComponent } from '../app/buses-dashboard/passengers/passengers.component';
// import { RoutesComponent } from '../app/buses-dashboard/routes/routes.component';
import { BusinfoComponent } from '../app/buses-dashboard/businfo/businfo.component';
import { ProfileComponent } from '../app/profile/profile.component';
// import { UserEditComponent } from './user-edit/user-edit.component';
const routes: Routes = [
    { path: '', component: LoginComponent, },
    { path: 'login', component: LoginComponent, },
    { path: 'home', component: HomeComponent, },
    { path: 'profile', component: ProfileComponent, },
    { path: 'registrations', component: RegistrationsComponent, },
    { path: 'fee', component: FeeComponent, },
    { path: 'buses', component: BusesDashboardComponent, },
    { path: 'businfo', component: BusinfoComponent, },
    // { path: 'businfo/passengers', component: PassengersComponent, },
    // { path: 'businfo/routes', component: RoutesComponent, },

];
@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes)
    ]
})

export class AppRoutingModule { }
