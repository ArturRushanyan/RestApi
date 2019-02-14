import { Component, OnInit } from '@angular/core'
import { Item } from '../../Interfaces/Item'
import { EventService } from '../../Services/event.service'
import { PassingDataService } from '../../Services/passing_data_service'

@Component({
  selector: 'sweetbox-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private _eventService: EventService,
              private _passingDataService: PassingDataService) { }

  private _itemsFromRes: Item[]

  public ngOnInit(): void {
    this._eventService.getAllItems()
      .subscribe(
        res => {
          this._itemsFromRes = res
          this._itemsFromRes.forEach(element => {
            this._passingDataService.setAutocompleteNames(element.title)
          })
        },
        err => console.log(err)
        )
  }
}
