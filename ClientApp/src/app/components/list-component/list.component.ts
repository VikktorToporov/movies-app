import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { list } from 'src/app/constants';
import { ListsService } from 'src/app/services';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{
  listId: number;
  list: Partial<list>;
  editMode = false;
  tempList: Partial<list> = {
    id: null,
    name: null,
  };

	constructor(protected route: ActivatedRoute, private listsService: ListsService) { }

	ngOnInit() {
		this.route.params
			.subscribe((params) => {
        if(params && params.id) {
          this.listId = params.id;
          
          this.getListInfo();
        }
			});
	}

  getListInfo() {
    this.listsService.getListDetails(this.listId)
    .pipe(take(1))
    .subscribe((data: any)=> {
      if(data[0]) {
        this.list = data[0];
      }
    });
  }

  updateList() {
    this.listsService.updateListInfo(this.list)
    .pipe(take(1))
    .subscribe((data: any)=> {
      if(data) {
        this.getListInfo();
      }
    });
  }

  toggleEditMode() {
    if (this.editMode) {
      this.list = {...this.tempList};
      
      this.updateList();
    } else {
      this.tempList = {...this.list};
    }

    this.editMode = !this.editMode;
  }
}
