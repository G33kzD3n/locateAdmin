import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { HomeComponent } from '../app/home/home.component';
import { MenuComponent } from '../app/menu/menu.component';
import { RegistrationsComponent } from '../app/registrations/registrations.component';
import { FeeComponent } from '../app/fee/fee.component';
import { BusesDashboardComponent } from '../app/buses-dashboard/buses-dashboard.component';
import { UserEditComponent } from './user-edit/user-edit.component';

const routes: Routes = [
    { path: '', component: LoginComponent, },
    { path: 'login', component: LoginComponent, },
    { path: 'home', component: HomeComponent, },
    { path: 'registrations', component: RegistrationsComponent, },
    { path: 'fee', component: FeeComponent, },
    { path: 'fee', component: FeeComponent, },
    { path: 'buses', component: BusesDashboardComponent, },
    { path: 'users', component: UserEditComponent }

];
@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes)
    ]
})

export class AppRoutingModule { }
