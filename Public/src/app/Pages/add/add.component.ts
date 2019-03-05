import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Ng2ImgMaxService } from 'ng2-img-max'
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
  public selectedFile: string | ArrayBuffer

  constructor(
    private _event: EventService,
    private _router: Router,
    private _ng2ImageMax: Ng2ImgMaxService,
    ) { }

  private _token: string

  public ngOnInit(): void {
    this._token = localStorage.getItem('token')
  }

  public addData(): void {
    this._event.addItem(this.addItemData, this._token)
      .subscribe(
        res => this._router.navigate(['/item']),
        err => console.log(err)
      )
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
              this.addItemData.image = reader.result
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

  // public getItemEvnet(file: any): void {
  // const reader = new FileReader()
  //   reader.readAsDataURL(file.target.files[0])
  //   reader.onload = () => {
  //     console.log('+_+_+_+_+ in getItemEventFunc =', reader.result)
  //     this.addItemData.image = reader.result
  //   }
  //   reader.onerror = (err) => {
  //     console.log('Error =>', err)
  //   }
  // }
}
