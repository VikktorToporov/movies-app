import { Component, EventEmitter, Output } from '@angular/core';
import { take } from 'rxjs/operators';
import { Genres, Show, SortColumn } from 'src/app/enums';
import { GenresService } from 'src/app/services';

@Component({
  selector: 'filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent {
  @Output('sort') sort: EventEmitter<any> = new EventEmitter();
  @Output('genres') genres: EventEmitter<Genres[]> = new EventEmitter();
  @Output('show') show: EventEmitter<Show> = new EventEmitter();
  @Output('filters') filtersToSend: EventEmitter<any> = new EventEmitter();

  allGenres: any[];
  sortFilter = SortColumn.ImdbRating;
  sortAsc = false;
  genresFilter: string[];
  showFilter = Show.all;

  enumSortColumn = SortColumn;
  enumShow = Show;

  constructor(private genresService: GenresService) {
    this.getGenres();
  }

  getGenres() {
    this.genresService.getAll()
    .pipe(take(1))
    .subscribe((data: any[])=> {
      if(data) {
        this.allGenres = data;
      }
    });
  }
  
  sendData() {
      const filters = {
        sort: this.sortFilter,
        sortAsc: this.sortAsc,
        genres: this.genresFilter,
        show: this.showFilter
      };

      this.filtersToSend.emit(filters);
  }
}
