import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../constants';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
    baseUrl = 'http://localhost:5215/api/User';

    constructor(private http: HttpClient) { }

    login(user: Partial<user>) {
      return this.http.put(`${this.baseUrl}/Login`, user);
    }

    signup(user: Partial<user>) {
      return this.http.post(`${this.baseUrl}`, user);
    }
}