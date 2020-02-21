import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MovieService } from 'src/app/services/movie.service';
import { Movie, Search } from 'src/app/models/movie.models';
@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  private id: string;
  public movie: Movie;
  public isFavorite: boolean;

  constructor(
    private _route: ActivatedRoute,
    private _movieService: MovieService
  ) { }

  ngOnInit() {
    this._route.params.pipe(
      switchMap(params => {
        this.id = params.id || 0;
        return this._movieService.getById(this.id);
      })
    ).subscribe((movie: any) => {
      this.movie = movie;
      this.isFavorite = this._movieService.checkFavorite(movie.imdbID);
    });
  }

  public addToFavorite(item: Movie) {
    const movie: Search = {
      Title: item.Title,
      Year: item.Year,
      imdbID: item.imdbID,
      Type: item.Type,
      Poster: item.Poster
    };
    this._movieService.addToFavorite(movie);
    this.isFavorite = true;
  }

  public removeFromFavorite(imdbID: string) {
    this._movieService.removeFromFavorite(imdbID);
    this.isFavorite = false;
  }

}
