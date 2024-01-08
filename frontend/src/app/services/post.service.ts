import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly http: HttpClient) {}

  getAllPosts(): any {
    return this.http.get<any>('http://localhost:9000/posts/all-posts');
  }
}
