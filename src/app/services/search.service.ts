import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { baseUrl} from '../endpoints';
import Post from '../models/Post';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  userUrl: String = `${baseUrl}/users`;

  constructor(private http: HttpClient) { }

  getUsers(firstName: string): Observable<User[]>{
    // return this.http.get<User[]>(`${this.userUrl}/search/${firstName}`, {headers: environment.headers, withCredentials: environment.withCredentials} );
    return this.http.get<User[]>(`${this.userUrl}/search/${firstName}`);

  }

  getUserById(id: number){
    // return this.http.get<User>(`${this.userUrl}/search/${id}`, {headers: environment.headers, withCredentials: environment.withCredentials});
    return this.http.get<User>(`${this.userUrl}/search/${id}`);

  }
}
