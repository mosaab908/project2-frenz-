import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  currentUserId = Number(this.cookieService.get('userId'));

  constructor(private authService: AuthService, 
    private router: Router, 
    private cookieService:CookieService,
    private profileComponent:ProfileComponent,) { }
  
  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  goToProfile() {
    console.log("Current LOGGED in user ID. Called from NavBar goToProfile(): " + this.currentUserId);
    localStorage.setItem('clickedId', String(this.currentUserId));
    console.log("Current CLICKED user ID. Called from NavBar goToProfile(): " + Number(JSON.parse(localStorage.getItem('clickedId') || '')));
    //alert("Clicked userId from NavBar: " + localStorage.getItem('clickedId'));
    //console.log("about to call searchclick event in line 82")
    this.profileComponent.searchClickEvent();
  }

}
