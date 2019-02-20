import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from 'src/app/Interfaces/Item'
import { EventService } from '../../Services/event.service'
import { PassingDataService } from '../../Services/passing_data_service'


@Component({
  selector: 'sweetbox-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent implements OnInit {

  public itemFromRes: Item[]

  constructor(
    private _passingDataService: PassingDataService,
    private _eventService: EventService,
    private _router: Router
    ) { }

  private _SearchingItemName: string

  public ngOnInit(): void {
    this._passingDataService.getSearchingItem().subscribe(val => {
      if (!val) {
        this._router.navigateByUrl('')
      } else {
        this._SearchingItemName = val
        this.Search()
      }
    })
  }

  private Search(): void {
    this._eventService.searchItem(this._SearchingItemName)
    .subscribe(
      res => this.itemFromRes = res,
      err => console.log('err =>', err)
      )
  }

}
