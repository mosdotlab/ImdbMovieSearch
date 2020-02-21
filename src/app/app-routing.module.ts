import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MovieSearchComponent } from './components/movie-search/movie-search.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { FavoritesComponent } from './components/favorites/favorites.component';


const routes: Routes = [{
  path: '',
  redirectTo: 'search',
  pathMatch: 'full'
},
{
  path: 'search',
  component: MovieSearchComponent
},
{
  path: 'movie-details/:id',
  component: MovieDetailsComponent
},
{
  path: 'favorites',
  component: FavoritesComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
