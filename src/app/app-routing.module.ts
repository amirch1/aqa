import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesComponent} from "./pages/movies/movies.component";
import {LoginComponent} from "./pages/login/login.component";
import {MoviesCanActivate} from "./gaurds/movies-can-activate";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'movies', component: MoviesComponent, canActivate: [MoviesCanActivate]},
  {path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
