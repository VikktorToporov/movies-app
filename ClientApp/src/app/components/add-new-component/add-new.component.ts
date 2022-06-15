import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, startWith, take } from 'rxjs/operators';
import { GenresService, ListsService, MovieListService } from 'src/app/services';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { list, movie } from 'src/app/constants';
import { verifyDescription, verifyDirector, verifyName, verifyParentRating } from 'src/app/shared-methods/validations';

@Component({
  selector: 'add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent {
  newMovie: Partial<movie> = {
    name: null,
    year: null,
    description: null,
    runtime: null,
    genres: [],
    parentRating: null,
    imdbRating: null,
    yourRating: null,
    link: 'https://www.imdb.com/title/tt0111161/',
    poster: 'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UX1000_.jpg',
    youtubeTrailer: '6hB3S9bIaco',
    director: null,
    stars: null,
    medialistIds: null,
    userId: Number(localStorage?.getItem('userId'))
  };
  newList: Partial<list> = {
    name: '',
    userId: Number(localStorage?.getItem('userId'))
  }
  
  addNewTypes = ['Movie', 'List'];
  type: string = null;
  allGenres: string[] = [];
  genreCtrl = new FormControl();
  filteredGenres: Observable<string[]>;
  addedGenres: string[] = [];

  addedActors: string[] = [];
  actorCtrl = new FormControl();

  separatorKeysCodes: number[] = [ENTER, COMMA];

  showError = false;

  @ViewChild('genreInput') genreInput: ElementRef<HTMLInputElement>;
  
	constructor(protected route: ActivatedRoute, protected router: Router, private genresService: GenresService, private movieListService: MovieListService, private listsService: ListsService) {}

	ngOnInit() {
		this.route.params
			.subscribe((params) => {
        if (params && params.type) {
          if (this.addNewTypes.includes(params.type)) {
              this.type = params.type;

              if(this.type == 'Movie') {
                this.getGenres();
              }
          }
        }
			});
	}

  getGenres() {
    this.genresService.getAll()
    .pipe(take(1))
    .subscribe((data: string[])=> {
      if(data) {
        this.allGenres = data;

        this.filteredGenres = this.genreCtrl.valueChanges.pipe(
          startWith(null),
          map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allGenres.slice())),
        );
      }
    });
  }

  addMovie() {
    if (this.newMovie && verifyName(this.newMovie.name) && verifyDescription(this.newMovie.description) && verifyDirector(this.newMovie.director) && verifyParentRating(this.newMovie.parentRating)) {
      this.showError = false;

      this.newMovie.genres = this.addedGenres;
      this.newMovie.stars = this.addedActors.join('/');
  
      this.movieListService.addMovie(this.newMovie)
      .pipe(take(1))
      .subscribe((data: boolean)=> {
        if(data) {
          this.router.navigate(['']);
        } else {
          console.log('There was an error!'); 
        }
      });
    } else {
      this.showError = true;
      this.scroll();
    }
  }

  addList() {
    if (this.newList && verifyName(this.newList.name)) {
      this.showError = false;

      this.listsService.addList(this.newList)
      .pipe(take(1))
      .subscribe((data: boolean)=> {
        if(data) {
          this.router.navigate(['/Lists']);
        } else {
          console.log('There was an error!'); 
        }
      });
    } else {
      this.showError = true;
      this.scroll();
    }
  }

  addActor(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.addedActors.push(value);
    }

    event.chipInput!.clear();
  }

  removeActor(actor: string): void {
    const index = this.addedActors.indexOf(actor);

    if (index >= 0) {
      this.addedActors.splice(index, 1);
    }
  }

  addGenre(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.addedGenres.push(value);
    }

    event.chipInput!.clear();

    this.genreCtrl.setValue(null);
  }

  removeGenre(genre: string): void {
    const index = this.addedGenres.indexOf(genre);

    if (index >= 0) {
      this.addedGenres.splice(index, 1);
    }
  }

  selectedGenre(event: MatAutocompleteSelectedEvent): void {
    this.addedGenres.push(event.option.viewValue);
    this.genreInput.nativeElement.value = '';
    this.genreCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGenres.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  private scroll() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
}
