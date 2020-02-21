import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Search, Movie } from '../models/movie.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_PATH = 'http://www.omdbapi.com/?apikey=5d05a624&';
  private storage = 'movies';
  public term: string;

  constructor(private _http: HttpClient) { }

  public searchByTitle(term: string): Observable<Search[]> {
    return this._http.get<Search[]>(`${this.API_PATH}s=${term}`);
  }

  public getById(id: string): Observable<Movie> {
    return this._http.get<Movie>(`${this.API_PATH}i=${id}`);
  }

  public getFavorites(): Search[] {
    const items = localStorage.getItem(this.storage);
    if (items) {
      return <Search[]>JSON.parse(items);
    }

    return [];
  }

  public addToFavorite(movie: Search) {
    const items = this.getFavorites();
    if (items.length === 0) {
      items.push(movie);
    } else {
      const item = items.find(x => x.imdbID === movie.imdbID);
      if (!item) {
        items.push(movie);
      }
    }
    localStorage.setItem(this.storage, JSON.stringify(items));
  }

  public removeFromFavorite(imdbID: string) {
    const items = this.getFavorites();
    if (items.length === 0) { return; }

    const index = items.findIndex(x => x.imdbID === imdbID);
    if (index > -1) {
      items.splice(index, 1);
      localStorage.setItem(this.storage, JSON.stringify(items));
    }
  }

  public checkFavorite(imdbID: string): boolean {
    const items = this.getFavorites();
    if (items.length === 0) { return false; }

    const index = items.findIndex(x => x.imdbID === imdbID);
    return index > -1;
  }
}
