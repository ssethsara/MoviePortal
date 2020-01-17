import { Component } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from "@angular/router";

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;

     constructor( private authService: AuthService, private route: Router){}
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

   
  logOut(): void {

    localStorage.removeItem('tokenJWT');
    this.authService.signOut();
    console.log('User has signed our');
    this.route.navigate(['/Login']);
  }
}
