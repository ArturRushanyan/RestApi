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

  public addItemData: Item = {
    _id: '',
    type: '',
    title: '',
    price: 1,
    count: 1,
    barcode: '',
    image: null,
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
    // console.log('+_+_+_+_+_+ in addData func =', this.addItemData)
    this._event.addItem(this.addItemData, this._token)
      .subscribe(
        res => this._router.navigate(['/item']),
        err => console.log(err)
      )
  }

  public getItemEvnet(file: any): void {
    const reader = new FileReader()
    reader.readAsDataURL(file.target.files[0])
    reader.onload = () => {
      console.log('+_+_+_+_+ in getItemEventFunc =', reader.result)
      this.addItemData.image = reader.result
    }
    reader.onerror = (err) => {
      console.log('Error =>', err)
    }
  }
}
