import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { baseUrl} from '../endpoints';
import Post from '../models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  postUrl: string = `${baseUrl}/post`

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    // return this.http.get<Post[]>(`${this.postUrl}`, {headers: environment.headers, withCredentials: environment.withCredentials})
    return this.http.get<Post[]>(`${this.postUrl}`)
  }

  upsertPost(post: Post): Observable<Post> {
    // return this.http.put<Post>(`${this.postUrl}`, post, {headers: environment.headers, withCredentials: environment.withCredentials})
    return this.http.put<Post>(`${this.postUrl}`, post)
  }
}
