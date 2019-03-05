import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Ng2ImgMaxService } from 'ng2-img-max'
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
  public selectedFile: string | ArrayBuffer

  constructor(
    private _updateService: PassingDataService,
    private _eventService: EventService,
    private _router: Router,
    private _ng2ImageMax: Ng2ImgMaxService,
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

  public getImageEvent(event: any): void {
    const file = event.target.files[0]
    this._ng2ImageMax.resizeImage(file, 400, 400).subscribe(
      result => {
        this._ng2ImageMax.compressImage(result, 0.070).subscribe(
          result1 => {
            const reader = new FileReader()
            reader.readAsDataURL(result1)
            reader.onload = () => {
              this.selectedFile = reader.result
              this.itemForUpdate.image = reader.result
            }
            reader.onerror = (err) => {
              console.log('Error => ', err)
            }
          },
          error => {
            console.log('Error =>', error)
          }
        )
      },
      error => {
        console.log('Error => ', error)
      }
    )
  }
}
