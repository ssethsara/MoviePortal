import { Component,OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { AccountService } from '../../Services/account-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{

  resultMessage: string; 
  constructor(private accountService: AccountService, private authService: AuthService, private route: Router ) { }
 
  ngOnInit(){
    this.getMovies();
  } 
 
  logOut(): void {

    localStorage.removeItem('tokenJWT');
    this.authService.signOut();
    console.log('User has signed our');
    this.route.navigate(['/Login']);
  }

  getMovies():void{
    this.accountService.GetMovies().subscribe(
      result => {
        console.log('success', result);
      //  this.route.navigate(['/home']);
      },
      error => {
        this.resultMessage = 'Get Movies Did not worked';
        console.log(error);
        if(error.status==401){
          this.route.navigate(['/Login']);
        }
       }
    );
  }


}
