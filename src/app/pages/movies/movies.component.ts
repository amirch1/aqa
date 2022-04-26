import { Component, OnInit, ViewChild } from '@angular/core';
import { MoviesService } from "../../services/movies.service";
import { ConfigService } from "../../services/config.service";
import { first } from "rxjs/operators";
import { Menu } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { Router } from "@angular/router";

export type Movie = {
  id: string;
  name: string;
  description: string;
  plays: number;
  playsDistribution: number;
  created: number;
  duration: number;
  pid: string;
  viewers: number | string;
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
  @ViewChild('actionsmenu', { static: true }) private actionsMenu: Menu | undefined;

  public movies: Movie[] = [];
  public bugs: string[] | null = null;
  public totals: Totals = null;
  public isBusy = false;
  public isAdmin = false;
  public showDuration = true;

  public actions: MenuItem[] = [
    {label: 'View Details', command: (event) => {this.actionSelected("view");}},
    {label: 'Delete', styleClass: 'kDanger', command: (event) => {this.actionSelected("delete");}}
  ];

  public showMovieDetails = false;
  public showSettings = false;
  public selectedMovie: Movie | null = null;

  constructor(private moviesService: MoviesService,
              private configService: ConfigService,
              private router: Router) { }

  ngOnInit(): void {
    this.isBusy = true;
    this.isAdmin = sessionStorage.getItem('aqaUser') === 'aqa_admin';
    this.moviesService.getMovies().pipe(first()).subscribe(
      result => {
        this.movies = result[0].entries;
        this.totals = result[0].totals;
        // update plays distribution
        // @ts-ignore
        this.movies.forEach(movie => movie.playsDistribution = Number((movie.plays / this.totals.plays * 100).toFixed(2)));
        this.checkLoaded();
      },
      error => {
        console.error(`Error connecting to Firestore: ${error}`);
      });
    this.configService.getConfig().pipe(first()).subscribe(
      result => {
        this.bugs = result[0].bugTypes && result[0].bugTypes.length ? result[0].bugTypes : [];
        this.checkLoaded();
      },
      error => {
        console.error(`Error connecting to Firestore: ${error}`);
      });
  }

  private applyBugs(): void {
    if (this.bugs !== null) {
      // apply functionality bugs
      if (this.bugs.indexOf('functionality') > -1) {
        this.movies[8].id = '1234';
        this.movies.forEach(movie => movie.viewers = movie.viewers.toString());
      }
      // apply data bugs
      if (this.bugs.indexOf('data') > -1 && this.totals) {
        this.movies[0].playsDistribution = 54.3;
        this.totals.viewers = 784;
        this.movies[7].avgCompletionRate = 103;
      }
      // apply graphic bugs
      this.actions = [
        {
          label: 'View Details',
          styleClass: this.bugs?.indexOf('graphics') !== -1 ? 'graphicsBug' : '',
          command: (event) => {
            this.actionSelected("view");
          }
        },
        {
          label: 'Delete',
          styleClass: this.bugs?.indexOf('graphics') !== -1 ? 'kDanger graphicsBug' : 'kDanger',
          command: (event) => {
            this.actionSelected("delete");
          }
        }
      ];
      // apply cross browser bugs
      const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
      this.showDuration = !(isFirefox && this.bugs?.indexOf('browser') !== -1);
    }
  }

  private checkLoaded(): void {
    if (this.bugs !== null && this.movies.length) {
      this.isBusy = false;
      this.applyBugs();
    }
  }

  openActionsMenu(event: any, movie: Movie): void{
    if (this.actionsMenu){
      this.selectedMovie = movie;
      this.actionsMenu.toggle(event);
    }
  }

  private actionSelected(action: string): void{
    switch (action){
      case "delete":
        this.delete();
        break;
      case "view":
        this.drillDown(this.selectedMovie);
        break;
    }
  }

  public drillDown(movie: Movie | null, fromTable = false): void {
    if (movie && !(this.bugs && this.bugs.indexOf('functionality') > -1 && fromTable)) {
      this.selectedMovie = movie;
      this.showMovieDetails = true;
    }
  }

  public delete(): void {
    // @ts-ignore
    this.movies = this.movies.filter(movie => movie.id !== this.selectedMovie.id);
    if (this.showMovieDetails) {
      this.showMovieDetails = false; // close details window if open
    }
  }

  public openSettings(): void {
    this.showSettings = true;
  }

  public logout():void {
    sessionStorage.removeItem('aqaUser');
    this.router.navigateByUrl('/login');
  }

}
