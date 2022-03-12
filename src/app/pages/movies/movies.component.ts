import { Component, OnInit } from '@angular/core';
import { MoviesService } from "../../services/movies.service";
import { first } from "rxjs/operators";

export type Movie = {
  id: string;
  name: string;
  description: string;
  plays: number;
  created: number;
  pid: string;
  uiconf: string;
}

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies: Movie[] = [];

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMovies().pipe(first()).subscribe(
      result => {
        this.movies = result[0].entries;
      },
      error => {
        console.error(`Error connecting to Firestore: ${error}`);
      });
  }

}
