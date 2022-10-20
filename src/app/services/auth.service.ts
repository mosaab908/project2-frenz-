import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import User from '../models/User';
import { baseUrl} from '../endpoints';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl: string = `${baseUrl}/auth`;
  currentUser: User
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');

  constructor(private http: HttpClient, private cookie: CookieService) { }

  login(email: string, password: string): Observable<any> {
    const payload = {email:email, password:password};
    // const res = this.http.post<any>(`${this.authUrl}/login`, payload, {headers: environment.headers, withCredentials: environment.withCredentials});
    const res = this.http.post<any>(`${this.authUrl}/login`, payload);
    res.subscribe((data) => {
      this.cookie.set('userId', data.id)
      this.saveLoggedInUser(data);
      this.currentUser = data;
    })
    return res;
  }

  logout(): void{
    this.http.post(`${this.authUrl}/logout`, null).subscribe();
    this.cookie.delete('userId');
    this.resetStorage();
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    const payload = {firstName: firstName, lastName: lastName, email: email, password: password};
    return this.http.post<any>(`${this.authUrl}/register`, payload);
    // return this.http.post<any>(`${this.authUrl}/register`, payload, {headers: environment.headers});
  }

  saveLoggedInUser(user: User){
    localStorage.setItem('current', JSON.stringify(user));
  }

  resetStorage(){
    localStorage.removeItem('current');
  }

}
