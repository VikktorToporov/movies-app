import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { movie } from '../constants';
import { Show, SortColumn, SortOrder } from '../enums';

@Injectable({
  providedIn: 'root'
})
export class MovieListService {
    baseUrl = 'http://localhost:5215/api/Movie';
    userId: number = Number(localStorage?.getItem('userId'));
    
    constructor(private http: HttpClient) {}

    getAll() {
      return this.http.get(`${this.baseUrl}?userId=${this.userId}`);
    }

    getListMovies(listId: number) {
      if(listId && listId > 0) {
        return this.http.get(`${this.baseUrl}?userId=${this.userId}&medialistId=${listId}`);
      }

      return null;
    }

    searchMovies(sortFilter: SortColumn, sortAscFilter: boolean, genresFilter: string[], showFilter: Show, searchTerm: string, listId: number) {
      const filters = [];

      if(SortColumn[sortFilter] != null) {
        filters.push(`sortColumn=${sortFilter}`);
      }

      if(sortAscFilter != null && sortAscFilter != undefined) {
        let sortOrder = SortOrder.desc;
        if (sortAscFilter) {
          sortOrder = SortOrder.asc;
        }

        filters.push(`sortOrder=${sortOrder}`);
      }

      if(genresFilter && genresFilter.length > 0) {
        genresFilter.forEach((genreId) => {
          filters.push(`genreIds=${genreId}`);
        });
      }

      if(showFilter && Show[showFilter]) {
        if (showFilter == Show.rated) {
          filters.push(`isYourRatingNull=true`);
        } else if (showFilter == Show.unrated){
          filters.push(`isYourRatingNull=false`);
        }
      }

      if(searchTerm && searchTerm.length > 2) {
        filters.push(`searchKeyword=${searchTerm}`);
      }

      if(listId && listId > 0) {
        filters.push(`medialistId=${listId}`);
      }

      filters.push(`userId=${this.userId}`);

      const filterStatement = filters.join('&');

      return this.http.get(`${this.baseUrl}?${filterStatement}`);
    }

    updateMovie(movie: Partial<movie>) {
      if(movie) {
        return this.http.put(`${this.baseUrl}`, movie);
      }

      return null;
    }
    
    addMovie(movie: Partial<movie>) {
      return this.http.post(`${this.baseUrl}`, movie);
    }
}