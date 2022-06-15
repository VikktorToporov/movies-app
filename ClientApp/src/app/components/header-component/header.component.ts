import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @ViewChild('searchTermInput') searchTermInput;

  constructor(protected router: Router) {}

  search() {
    if(this.searchTermInput?.nativeElement && this.searchTermInput?.nativeElement.value?.length > 2) {
      this.router.navigate(['Search/', this.searchTermInput.nativeElement.value]);
      this.searchTermInput.nativeElement.value = '';
    }
  }

  logout() {
    localStorage.removeItem('userId');

    window.location.href = '';
  }
}
