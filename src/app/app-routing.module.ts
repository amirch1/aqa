import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminComponent} from "./pages/admin/admin.component";
import {MoviesComponent} from "./pages/movies/movies.component";

const routes: Routes = [
  {path: 'movies', component: MoviesComponent},
  {path: 'admin', component: AdminComponent},
  {path: '**', redirectTo: '/movies'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
