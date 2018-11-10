import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../app/app.routing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BusesDashboardComponent } from './buses-dashboard/buses-dashboard.component';
import { RegistrationsComponent } from './registrations/registrations.component';
import { FeeComponent } from './fee/fee.component';
import { MaterialModule } from './material';
import { FilterPipe } from './filter.pipe';
import { PassengersComponent } from './buses-dashboard/passengers/passengers.component';
import { RoutesComponent } from './buses-dashboard/routes/routes.component';
import { BusinfoComponent } from './buses-dashboard/businfo/businfo.component';
import { ProfileComponent } from './profile/profile.component';
import { EditDriverComponent } from './home/edit-driver/edit-driver.component';
import { EditCordinatorComponent } from './home/edit-cordinator/edit-cordinator.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditBusComponent } from './buses-dashboard/businfo/edit-bus/edit-bus.component';
import { AgmCoreModule } from '@agm/core';
import { EditStudentComponent } from './home/edit-student/edit-student.component';
import { MessageComponent } from './message/message.component';

// import { toastr } from 'toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    BusesDashboardComponent,
    RegistrationsComponent,
    FeeComponent,
    FilterPipe,
    PassengersComponent,
    RoutesComponent,
    BusinfoComponent,
    ProfileComponent,
    EditDriverComponent,
    EditCordinatorComponent,
    EditBusComponent,
    EditStudentComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAimSdtntTqL2lHcj7iEX5yqTZgjL2NGFA'
    })
  ],
  entryComponents: [
    EditDriverComponent,
    EditCordinatorComponent,
    EditBusComponent,
    EditStudentComponent,
    MessageComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
