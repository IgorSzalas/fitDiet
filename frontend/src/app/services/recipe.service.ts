import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private readonly http: HttpClient) {}

  getRecipesByUserPreferences(userID: string): any {
    const userParams = new HttpParams().set('userID', userID);
    return this.http.get<any>(
      'http://localhost:9000/recipes/favourite-ingredients',
      {
        params: userParams,
      }
    );
  }
}
