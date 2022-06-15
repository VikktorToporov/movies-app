import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

import { list, movie } from 'src/app/constants';
import { Show, SortColumn } from 'src/app/enums';
import { ListsService, MovieListService } from 'src/app/services';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnChanges {
  @Input ('listId') listId = 0;
  @Input ('search-term') searchTerm: string;
  @Input ('is-primary') isPrimary = true;

  movies!: movie[];
  lists!: list[];

  sortFilter: SortColumn;
  sortAscFilter = false;
  genresFilter: string[] = [];
  showFilter: Show;

  constructor(private movieListService: MovieListService, protected route: ActivatedRoute, private listService: ListsService) {}

  ngOnInit(): void {
    if(this.searchTerm && this.searchTerm.length > 2 || this.listId && this.listId > 0) {
      this.search();
    } else {
      this.getAllMovies();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.searchTerm?.currentValue != changes?.searchTerm?.previousValue) {
      this.movies = [];

      this.search();
    }
  }

  getList() {
    this.movies = [];

    this.movieListService.getListMovies(this.listId)
    .pipe(take(1))
    .subscribe((data: movie[])=> {
      if(data) {
        this.movies = data;
      }
    });
  }

  filterMovies(filters: any) {
    if(filters?.sort != this.sortFilter || filters?.sortAsc != this.sortAscFilter || filters?.genres != this.genresFilter || filters?.show != this.showFilter) {
      this.sortFilter = filters?.sort;
      this.sortAscFilter = filters?.sortAsc;
      this.genresFilter = filters?.genres;
      this.showFilter = filters?.show;

      this.search();
    }
  }

  search() {
    this.movieListService.searchMovies(this.sortFilter,this.sortAscFilter,this.genresFilter,this.showFilter,this.searchTerm,this.listId)
    .pipe(take(1))
    .subscribe((data: movie[])=> {
      this.movies = [];

      if(data) {
        this.movies = data;
      }
    });
  }

  getAllMovies() {
    this.movies = [];

    this.movieListService.getAll()
    .pipe(take(1))
    .subscribe((data: movie[])=> {
      if(data) {
        this.movies = data;
      }
    });
  }
  
  getAllListedMovies() {
    this.listService.getAll()
      .pipe(take(1))
      .subscribe((data: list[])=> {
        if(data) {
          this.lists = data;
        }
      });
  }
}
