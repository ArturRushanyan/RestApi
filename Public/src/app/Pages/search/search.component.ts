import { Component, OnInit } from '@angular/core'
import { Item } from 'src/app/Interfaces/Item'
import { EventService } from '../../Services/event.service'
import { PassingDataService } from '../../Services/passing_data_service'


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  constructor(private _passingDataService: PassingDataService,
              private _eventService: EventService) { }
  private _SearchingItemName: string
  private _itemFromRes: Item[]


  public ngOnInit(): void {
   this._SearchingItemName = this._passingDataService.getSearchingItemName().value
   this._eventService.searchItem(this._SearchingItemName).subscribe(
     res => {
      console.log(res)
      this._itemFromRes = res
     },
     err => {
       console.log('log in err case')
       console.log(err)
     }
   )
  }

}
