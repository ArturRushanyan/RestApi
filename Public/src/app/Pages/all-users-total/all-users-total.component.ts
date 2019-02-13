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

  constructor(private _eventService: EventService) { }

  private token: string = localStorage.getItem('token')

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
    this._eventService.resetUserDebt(user, this.token).subscribe(
      res => { console.log('+_+ res =>', res) }
    )
  }

  public resetAllUsers(): void {
    console.log('+_+ log in reset AllUsers')
    this._eventService.resetAllUsersDebt(this.allUsers, this.token).subscribe()
  }

}
