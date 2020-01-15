import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {Movie} from '../../Models/Movie'
import {NgForm} from '@angular/forms';
import { AccountService } from '../../Services/account-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movie=new Movie();
  date=new Date();
  resultMessage;

  constructor(private accountService: AccountService,private route: Router ) { }

  ngOnInit() {
  }

  onClickSubmit() {

    this.movie.released_Year=this.date.toISOString();

    console.log(this.movie);
    this.accountService.PostMovies(this.movie).subscribe(
      result => {
        console.log('success', result);
        this.movie.coverImage="";
        this.movie.name="";
        this.movie.description="";
        this.movie.rating=0;
        this.movie.released_Year="";

      //  this.route.navigate(['/home']);
      },
      error => {
        this.resultMessage = 'Post Movies Did not worked';
        console.log(error);
        if(error.status==401){
          this.route.navigate(['/Login']);
        }
       }
    );
 }

}



