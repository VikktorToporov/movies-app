import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GenresService {
    baseUrl = 'http://localhost:5215/api/Genre';
    userId = Number(localStorage?.getItem('userId'));
    
    constructor(private http: HttpClient) { }

    getAll() {
      return this.http.get(`${this.baseUrl}?userId=${this.userId}`);
    }
}