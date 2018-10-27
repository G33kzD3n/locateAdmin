import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app/app.routing'


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BusesDashboardComponent } from './buses-dashboard/buses-dashboard.component';
import { BusesListComponent } from './buses-dashboard/buses-list/buses-list.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { FeeComponent } from './fee/fee.component';
import { MaterialModule } from './material';


// import { toastr } from 'toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    BusesDashboardComponent,
    BusesListComponent,
    RegistrationsComponent,
    FeeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule
    //toastr
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
