import { Component, OnInit } from '@angular/core';
///some other imports
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AccountService } from '../../Services/account-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  userData: any [] = [];
  
  resultMessage: string;
  constructor(private accountService: AccountService, private authService: AuthService,private route: Router) { }
  ngOnInit() {}


logInWithGoogle(platform: string): void {
  platform = GoogleLoginProvider.PROVIDER_ID;
     this.authService.signIn(platform).then((response) => {
       console.log(platform + ' logged in user data is= ' , response);
       this.userData.push({
         UserId: response.id,
         Provider: response.provider,
         FirstName: response.firstName,
         LastName: response.lastName,
         EmailAddress: response.email,
         TokenId: response.idToken,
         PictureUrl: response.photoUrl
       });
       this.accountService.Login(this.userData[0]).subscribe(
        result => {
          localStorage.setItem('tokenJWT', result.tokenJWT);
          console.log('success', result);
          this.route.navigate(['/']);
        },
    error => {
          this.resultMessage = 'it didn\'t work and that sucks';
          console.log(error);
         }
      );
   },
   (error) => {
     console.log(error);
     this.resultMessage = error;
    });
  }




}