import { Component, OnInit, AfterViewInit, OnDestroy, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';
import { Search } from 'src/app/models/movie.models';
import { FormControl } from '@angular/forms';
import { MovieService } from 'src/app/services/movie.service';
import { debounceTime, distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  @Output() onSearch = new EventEmitter<Observable<Search[]>>();
  private sub$ = new Subscription();
  public seacrhControl: FormControl = new FormControl();

  constructor(
    private _movieService: MovieService,
    private _cdrf: ChangeDetectorRef) { }

  ngOnInit() {
    this.search();
  }

  ngAfterViewInit() {
    const term = this._movieService.term;
    if (term) {
      this.seacrhControl.setValue(term);
      this._cdrf.detectChanges();
    }
  }

  ngOnDestroy() {
    this.sub$.unsubscribe();
  }

  private search() {
    this.sub$ = this.seacrhControl.valueChanges
      .pipe(
        debounceTime(100),
        distinctUntilChanged(),
        filter((term: string) => term.length > 2),

        switchMap(
          (term: string) => {
            if (!term) {
              return [];
            } else {
              this._movieService.term = term;
              return this._movieService.searchByTitle(term);
            }
          })
      ).subscribe(
        data => {
          this.onSearch.emit(of(data.Search));
        });
  }
}
