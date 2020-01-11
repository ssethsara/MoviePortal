import { Component, OnInit } from '@angular/core';
///some other imports
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //create array to store user data we need
  userData: any [] = [];
  // create a field to hold error messages so we can bind it to our        template
     resultMessage: string;
  constructor( private authService: AuthService ) { }
  ngOnInit() {
      //some code
    }

//logIn with google method. Takes the platform (Google) parameter.
logInWithGoogle(platform: string): void {
  platform = GoogleLoginProvider.PROVIDER_ID;
  //Sign In and get user Info using authService that we just injected
     this.authService.signIn(platform).then((response) => {
  //Get all user details
       console.log(platform + ' logged in user data is= ' , response);
  //Take the details we need and store in an array
       this.userData.push({
         UserId: response.id,
         Provider: response.provider,
         FirstName: response.firstName,
         LastName: response.lastName,
         EmailAddress: response.email,
         PictureUrl: response.photoUrl
       });
   },
   (error) => {
     console.log(error);
     this.resultMessage = error;
    });
  }

  logOut(): void {
    this.authService.signOut();
    console.log('User has signed our');
  }




}