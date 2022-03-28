import { Component, OnInit } from '@angular/core';
import { MoviesService } from "../../services/movies.service";
import { first } from "rxjs/operators";
import {SortEvent} from "primeng/api";

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
  minutesViewed: number;
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
  public isBusy = false;

  public sortField = 'plays';
  public sortOrder = -1;

  constructor(private moviesService: MoviesService) { }

  ngOnInit(): void {
    this.isBusy = true;
    this.moviesService.getMovies().pipe(first()).subscribe(
      result => {
        this.movies = result[0].entries;
        this.totals = result[0].totals;
        this.isBusy = false;
      },
      error => {
        console.error(`Error connecting to Firestore: ${error}`);
      });
  }

  public onSortChanged(event: SortEvent): void {
    if (event.data && event.data.length && event.field && event.order) {
      const order = event.order === 1 ? '+' + event.field : '-' + event.field;
      if (order !== this.sortField) {
        this.sortField = order;
      }
    }
  }

  public drillDown(video: Movie): void {

  }

}
