import { Component,OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { AccountService } from '../../Services/account-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  movieList:any;
  resultMessage: string; 
  constructor(private accountService: AccountService, private authService: AuthService, private route: Router ) { }
 
  ngOnInit(){
    this.getMovies();
  } 
 
  AddMovieEventHander() {
    this.getMovies();
  }
  getMovies():void{
    this.movieList=[];
    this.accountService.GetMovies().subscribe(
      result => {
        console.log('success', result);
        this.movieList=result;
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

  removeMovie(id){
    console.log("Deleting Movie ",id);
    this.accountService.DeleteMovies(id).subscribe(
      result => {
        console.log('success', result);
        this.getMovies();
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
