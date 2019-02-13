import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/Interfaces/User'
import { EventService } from '../../Services/event.service'

@Component({
  selector: 'app-all-users-total',
  templateUrl: './all-users-total.component.html',
  styleUrls: ['./all-users-total.component.css']
})
export class AllUsersTotalComponent implements OnInit {

  public allUsers: User

  constructor(private _eventService: EventService) { }


  public ngOnInit(): void {
    this._eventService.getAllUsers()
    .subscribe(
      res => {
        this.allUsers = res
      },
      err => {
        console.log('+_+_+_+ err =>', err)
      }
    )
  }

  public resetUser(user: User): void {
    this._eventService.resetUserDebt(user, localStorage.getItem('token')).subscribe(
      res => {
        user.mustPay = parseInt(res, 10)
        console.log('+_+_+ user after reset')
      }
    )
  }

}
