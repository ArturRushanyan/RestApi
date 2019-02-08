import { Component, OnInit } from '@angular/core';
import { PassingDataService } from '../../Services/passing_data_service';
import { EventService } from '../../Services/event.service';
import { Item } from 'src/app/Interfaces/Item';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  private SearchingItemName: string;
  private itemFromRes: Item;
  constructor(private _passingDataService: PassingDataService,
              private _eventService: EventService) { }


  ngOnInit() {
   this.SearchingItemName = this._passingDataService.getSearchingItemName().value;
   this._eventService.searchItem(this.SearchingItemName).subscribe(
     res => {
      console.log(res);
      this.itemFromRes = res;
     },
     err => {
       console.log('log in err case');
       console.log(err);
     }
   );
  }

}
