import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { list } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class ListsService {
    baseUrl = 'http://localhost:5215/api/Medialist';
    userId = Number(localStorage?.getItem('userId'));

    constructor(private http: HttpClient) { }

    getAll() {
      return this.http.get(`${this.baseUrl}?userId=${this.userId}`);
    }

    getListDetails(listId: number) {
      if(listId && listId> 0) {
        return this.http.get(`${this.baseUrl}/GetById?userId=${this.userId}&medialistId=${listId}`);
      }

      return null;
    }

    searchLists(searchTerm: string) {
      if(searchTerm && searchTerm.length > 0) {
        return this.http.get(`${this.baseUrl}?userId=${this.userId}&keyword=${searchTerm}`);
      }

      return null;
    }
    
    updateList(listId: string, movieId: string) {
      if(listId && movieId) {
        return this.http.put(`${this.baseUrl}/AddOrRemoveMovie?userId=${this.userId}&movieId=${movieId}&playlistId=${listId}`, null);
      }

      return null;
    }

    updateListInfo(list: Partial<list>) {
      if(list) {
        return this.http.put(`${this.baseUrl}`, list);
      }

      return null;
    }

    addList(list: Partial<list>) {
      return this.http.post(`${this.baseUrl}`, list);
    }
}