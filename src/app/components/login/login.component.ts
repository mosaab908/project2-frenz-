import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import User from 'src/app/models/User';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  invalidCredintials: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  

  constructor(private authService: AuthService, private router: Router, private cookie: CookieService) { }

  ngOnInit(): void {
  }
  
  onSubmit(e: any): void {
    e.preventDefault()
    this.authService.login(this.loginForm.value.email || "", this.loginForm.value.password || "")
      .subscribe(
        (response) => {      
          if(response.firstName == "" || response.password == ""){
            this.invalidCredintials = true;
          }else{
            this.router.navigate(['post-feed'])
          }

          return response;
        }
      )
  }

  register(): void {
    this.router.navigate(['register']);
  }

}
