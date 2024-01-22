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

  deletePost(userID: string, postID: string): any {
    const userParams = new HttpParams()
      .set('userID', userID)
      .set('postID', postID);
    return this.http.delete<any>('http://localhost:9000/posts/delete', {
      params: userParams,
    });
  }

  deleteComment(userID: string, postID: string): any {
    const userParams = new HttpParams()
      .set('userID', userID)
      .set('postID', postID);
    return this.http.delete<any>('http://localhost:9000/posts/delete-comment', {
      params: userParams,
    });
  }

  addComment(postID: string, commentData: any): any {
    const userParams = new HttpParams().set('postID', postID);
    return this.http.post<any>(
      'http://localhost:9000/posts/add-comment',
      commentData,
      {
        params: userParams,
      }
    );
  }
}
