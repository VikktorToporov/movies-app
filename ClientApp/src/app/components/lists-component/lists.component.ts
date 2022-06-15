import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { take } from 'rxjs/operators';

import { list } from 'src/app/constants';
import { ListsService } from 'src/app/services';

@Component({
  selector: 'lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit, OnChanges {
  @Input('search-term') searchTerm: string;

  lists: list[];
  editMode = false;
  userId = Number(localStorage?.getItem('userId'));
  
  constructor(private listService: ListsService) {}

  ngOnInit(): void {
      if(this.searchTerm && this.searchTerm.length > 2) {
        this.search();
      } else {
        this.getAllLists();
      }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes?.searchTerm?.currentValue != changes?.searchTerm?.previousValue) {
      this.lists = [];
      
      this.search();
    }
  }

  search() {
    this.listService.searchLists(this.searchTerm)
    .pipe(take(1))
    .subscribe((data: list[])=> {
      if(data) {
        this.orderList(data);
      }
    });
  }

  getAllLists() {
    this.listService.getAll()
    .pipe(take(1))
    .subscribe((data: list[])=> {
      if(data) {
        this.orderList(data);
      }
    });
  }

  orderList(data: list[]) {
    if (data && data.length > 0) {
      const myLists = data.filter(list => list.userId === this.userId);
      const otherLists = data.filter(list => list.userId !== this.userId);
   
      this.lists = myLists.concat(otherLists);
    }
  }

  updateList(list: list) {
    if (list) {
      list.private = !list.private;

      this.listService.updateListInfo(list)
      .pipe(take(1))
      .subscribe((data: any)=> {});
    }
  }
}
