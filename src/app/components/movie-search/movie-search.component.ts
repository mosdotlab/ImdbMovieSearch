import { Component } from '@angular/core';
import { Search } from 'src/app/models/movie.models';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.scss']
})
export class MovieSearchComponent {
  public movies$: Observable<Search[]>;

  public onSearch(search: Observable<Search[]>) {
    if (search) {
      this.movies$ = search;
    }
  }
}
