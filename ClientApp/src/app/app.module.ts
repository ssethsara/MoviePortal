import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './Component/nav-menu/nav-menu.component';
import { HomeComponent } from './Component/home/home.component'; 

import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';
import { LoginComponent } from './Component/login/login.component';
import { AccountService } from './Services/account-service.service';
import { AppRoutingModule } from './app-routing.module';
import { AddMovieComponent } from './Component/add-movie/add-movie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/';
import { MovieDescriptionComponent } from './movie-description/movie-description.component'; 
let config = new AuthServiceConfig([
  {
     id: GoogleLoginProvider.PROVIDER_ID,
     provider: new GoogleLoginProvider("586403743143-vqc0jcjsuu3i0pnju6mumbrct2qp6r03.apps.googleusercontent.com")
  },
]);
export function provideConfig()
 {
    return config;
 }


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    AddMovieComponent,
    MovieDescriptionComponent
  ],
  imports: [
    
    SocialLoginModule.initialize(config),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,MatSelectModule,MatCardModule,MatFormFieldModule,MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
    AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
