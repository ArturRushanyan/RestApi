import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from 'src/app/Interfaces/Item'
import { EventService } from '../../Services/event.service'
import { PassingDataService } from '../../Services/passing_data_service'

@Component({
  selector: 'sweetbox-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  public itemForUpdate: Item

  constructor(
    private _updateService: PassingDataService,
    private _eventService: EventService,
    private _router: Router
    ) { }

  private userRole: string
  private token: string
  public ngOnInit(): void {
    this.itemForUpdate = this._updateService.getUpdatingItem()
  }

  public updateItem(): void {
    this.userRole = localStorage.getItem('userRole')
    if (this.userRole === 'admin') {
      this.token = localStorage.getItem('token')
      this._eventService.updateItem(this.itemForUpdate, this.token)
      .subscribe(
        res => this._router.navigateByUrl('/item'),
        err => console.log(err)
      )
    } else {
      this._router.navigateByUrl('/item')
    }
  }
}
