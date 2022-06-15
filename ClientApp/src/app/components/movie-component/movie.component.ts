import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { list, movie } from 'src/app/constants';
import { ListsService, MovieListService } from 'src/app/services';
import { YourRatingDialogComponent } from '..';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent {
  @Input ('movie') movie!: Partial<movie>;
  @Input ('movie-lists') lists!: list[];

  @Output ('update-movie-lists') updateMovieLists: EventEmitter<void> = new EventEmitter;
  @Output ('update-movies') updateMovies: EventEmitter<void> = new EventEmitter;

  movieId: string;
  panelOpenState = false;
  editMode = false;
  userId: number;

  tempMovieDetails: Partial<movie> = {
    name: null,
    year: null,
    description: null,
    runtime: null,
    genres: null,
    parentRating: null,
    imdbRating: null,
    yourRating: null,
    link: null,
    poster: null,
    youtubeTrailer: null,
    director: null,
    stars: null,
    medialistIds: null,
    userId: null
  }

  constructor(public dialog: MatDialog, private movieListService: MovieListService, private listService: ListsService) {
    this.userId = +localStorage?.getItem('userId');
  }
  
  openDialog(movie: Partial<movie>): void {
    let yourNewRating = 0;
    this.movieId = movie?.id;

    const dialogRef = this.dialog.open(YourRatingDialogComponent, {
      width: '500px',
      data: {
        rating: movie?.yourRating,
        movie: movie?.name,
      }
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result != null && result != undefined && result != movie?.yourRating) {
        yourNewRating = result;
        const movieToUpdate = {...this.movie};

        movieToUpdate.yourRating = yourNewRating ? yourNewRating : null;
        movieToUpdate.genres = this.convertGenresObjectsToString(movieToUpdate.genres);

       this.updateMovie(movieToUpdate);
      }
    });
  }

  updateList(listId: string, movieId: string) {
    const matchList = this.lists.find((list) => list && list.id === listId);

			if (matchList && movieId) {
        this.listService.updateList(listId, movieId)
          .pipe(take(1))
          .subscribe((data: any)=> {
            if(data) {
              this.updateMovieLists.emit();
              this.updateMovies.emit();
            }
          });
			}
  }

  updateMovie(movie: Partial<movie>) {
    movie.userId = Number(this.userId);
    
    this.movieListService.updateMovie(movie)
    .pipe(take(1))
    .subscribe((data: any)=> {
      if(data) {
        this.updateMovieLists.emit();
        this.updateMovies.emit();
      }
    });
  }

  toggleEditMode() {
    if (this.editMode) {
      this.movie = {...this.tempMovieDetails};
      this.removeGenres();
      this.updateMovie(this.movie);

      this.editMode = !this.editMode;
    } else if (this.movie?.userId === this.userId){
      this.tempMovieDetails = {...this.movie};
      this.tempMovieDetails.genres = this.convertGenresObjectsToString(this.tempMovieDetails.genres);

      this.editMode = !this.editMode;
    }
  }
  convertGenresObjectsToString(genres: any[]): any[] {
   if (genres && genres.length > 0) {
    genres = genres.map(genre => genre.name);
   }

   return genres;
  }

  removeGenres() {
    this.movie.genres = this.movie.genres.filter(genre => genre != '');
  }

  addNewGenre() {
    this.movie.genres.push('');
  }

  trackByFn(index, item) {   return index; }

  openExpansionPanel() {
    this.panelOpenState = true;
    this.updateMovieLists.emit();
  }
}
