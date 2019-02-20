import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Item } from 'src/app/Interfaces/Item'
import { EventService } from '../../Services/event.service'

@Component({
  selector: 'sweetbox-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public addUserData: Item = {
    _id: '',
    type: '',
    title: '',
    price: 1,
    count: 1,
    barcode: ''
  }
  constructor(
    private _event: EventService,
    private _router: Router
    ) { }

  private _token: string

  public ngOnInit(): void {
    this._token = localStorage.getItem('token')
  }

  public addData(): void {
    this._event.addItem(this.addUserData, this._token)
      .subscribe(
        res => this._router.navigate(['/item']),
        err => console.log(err)
      )
  }

}
