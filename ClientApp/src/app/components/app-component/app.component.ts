import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogged = false;

 constructor() {
  if (localStorage.getItem('userId')) {
    this.isLogged = true;
  }
 }
}
