import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { NavMenuComponent } from './Component/nav-menu/nav-menu.component';
import { HomeComponent } from './Component/home/home.component';
import { LoginComponent } from './Component/login/login.component';

const routes: Routes = [ 
        { path: 'Login', component: LoginComponent, pathMatch: 'full' },
        { path: '', component: HomeComponent },
];

@NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ],
        declarations: []
})
export class AppRoutingModule { }