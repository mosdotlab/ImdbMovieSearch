import { Component, OnInit, Input } from '@angular/core';
import { Search } from 'src/app/models/movie.models';
import { from, Observable, of } from 'rxjs';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  public movies$: Observable<Search[]>;

  constructor(private _movieService: MovieService) { }

  ngOnInit() {
    const movies = this._movieService.getFavorites();
    this.movies$ = of(movies);
  }

}
