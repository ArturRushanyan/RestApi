import { Component, OnInit } from '@angular/core'
import { User } from 'src/app/Interfaces/User'
import { EventService } from '../../Services/event.service'

@Component({
  selector: 'sweetbox-all-users-total',
  templateUrl: './all-users-total.component.html',
  styleUrls: ['./all-users-total.component.css']
})
export class AllUsersTotalComponent implements OnInit {

  public allUsers: User
  public showModal = false

  constructor(
    private _eventService: EventService
    ) { }

  private _token: string = localStorage.getItem('token')
  private _resetingUserDebt: User

  public ngOnInit(): void {
    this._eventService.getAllUsers()
    .subscribe(
      res => this.allUsers = res,
      err => console.error('Err =>', err)
    )
  }

  public getUserData(user: User, Role: string): void {
    this._resetingUserDebt = user
    if (Role === 'admin') {
      localStorage.setItem('mustPay', '0')
    }
  }

  public resetUser(): void {
    this._eventService.resetUserDebt(this._resetingUserDebt, this._token)
    .subscribe(
      res => window.location.reload(),
      err => console.error('Err =>', err)
    )
  }

  public resetAllUsers(): void {
    this._eventService.resetAllUsersDebt(this.allUsers, this._token)
    .subscribe(
      res => {
        localStorage.setItem('mustPay', '0')
        window.location.reload()
      },
      err => console.error('Err=> ', err)
    )
  }
}
