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
export class ProfileService {

  user!: User;
  userUrl: String = `${baseUrl}/users`;

  constructor(private http: HttpClient) { }

  updateUser(id: number,user: User): Observable<User>{
    // return this.http.put<User>(`${this.userUrl}/update/${id}`, user, {headers: environment.headers, withCredentials: environment.withCredentials});
    return this.http.put<User>(`${this.userUrl}/update/${id}`, user)
  }

  getUserByID(id: number): Observable<User>{
    // return this.http.get<User>(`${this.userUrl}/searchById/${id}`, {headers: environment.headers, withCredentials: environment.withCredentials});
    return this.http.get<User>(`${this.userUrl}/searchById/${id}`);
  }


  getUserPosts(userId: number): Observable<Post[]>{
    // return this.http.get<Post[]>(`${this.userUrl}/posts/${userId}`, {headers: environment.headers, withCredentials: environment.withCredentials} )
    return this.http.get<Post[]>(`${this.userUrl}/posts/${userId}`)
  }

  upsertPost(post: Post): Observable<Post> {
    // return this.http.put<Post>(`${this.userUrl}/update`, post, {headers: environment.headers, withCredentials: environment.withCredentials})
    return this.http.put<Post>(`${this.userUrl}/update`, post)

  }

  // deletePostOrComment(userId: Number, post: Post): Observable<Post> {
  //   return this.http.delete<Post>(`${this.userUrl}/delete/${userId}`, post, {headers: environment.headers, withCredentials: environment.withCredentials})
  // }
}