import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../app/login/login.component';
import { HomeComponent } from '../app/home/home.component';
import { MenuComponent } from '../app/menu/menu.component';

const routes: Routes = [
    { path: '', component: LoginComponent, },
    { path: 'login', component: LoginComponent, },
    { path: 'home', component: HomeComponent, },
    { path: 'menu', component: MenuComponent, }
];
@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(routes)
    ]
})

export class AppRoutingModule { }
