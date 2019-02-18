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

  public itemsFromRes: Item[]

  constructor(private _eventService: EventService,
              private _passingDataService: PassingDataService) { }

  public ngOnInit(): void {
    this._eventService.getAllItems()
      .subscribe(
        res => {
          this.itemsFromRes = res,
          this.filter(this.itemsFromRes)
        },
        err => console.log(err)
        )
  }

  private filter(unFiltered: Item[]): void {
    const titles = []
    unFiltered.forEach((item) => {
      if (titles.indexOf(item.title) < 0) {
        titles.push(item.title)
      }
    })
      console.log('+__+_+_+ title =', titles)
    this._passingDataService.setAutocomplete(titles)
  }

}


