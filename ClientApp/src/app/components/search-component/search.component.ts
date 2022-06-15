import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { list, movie } from 'src/app/constants';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string;
  movies!: movie[];
  filteredLists: list[];
  
  constructor(protected route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
			.subscribe((params) => {
        if(params && params.term) {
          this.searchTerm = params.term;
        }
			});
  }
}
