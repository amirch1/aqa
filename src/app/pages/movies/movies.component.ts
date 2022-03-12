import { Component, OnInit } from '@angular/core';
import { MoviesService } from "../../services/movies.service";
import { first } from "rxjs/operators";

export type Movie = {
  id: string;
  name: string;
  description: string;
  plays: number;
  created: number;
  duration: number;
  pid: string;
  uiconf: string;
  viewers: number;
  avgCompletionRate: number;
  owner: string;
};

export type Totals = {
  entries: number;
  plays: number;
  viewers: number;
  minutesViewed: number;
  avgCompletionRate: number;
} | null;

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  public movies: Movie[] = [];
  public totals: Totals = null;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.moviesService.getMovies().pipe(first()).subscribe(
      result => {
        this.movies = result[0].entries;
        this.totals = result[0].totals;
      },
      error => {
        console.error(`Error connecting to Firestore: ${error}`);
      });
  }

}
