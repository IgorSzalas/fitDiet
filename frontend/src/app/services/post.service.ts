import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private readonly http: HttpClient) {}

  getAllPosts(): any {
    return this.http.get<any>('http://localhost:9000/posts/all-posts');
  }

  addNewPost(userID: string, postData: any): any {
    const userParams = new HttpParams().set('userID', userID);
    return this.http.post<any>(
      'http://localhost:9000/posts/add-post',
      postData,
      {
        params: userParams,
      }
    );
  }
}
