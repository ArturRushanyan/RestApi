import { Component, OnInit } from '@angular/core';
import { EventService } from '../../Services/event.service';
import { User } from 'src/app/Interfaces/User';

@Component({
  selector: 'app-all-users-total',
  templateUrl: './all-users-total.component.html',
  styleUrls: ['./all-users-total.component.css']
})
export class AllUsersTotalComponent implements OnInit {

  constructor(private _eventService: EventService) { }

  public allUsers;

  ngOnInit() {
    this._eventService.getAllUsers()
    .subscribe(
      res => {
        this.allUsers = res;
        console.log('+_+_+ all users =', this.allUsers);
      },
      err => {
        console.log('+_+_+_+ err =>', err);
      }
    )
  };

  resetUser(user) {
    this._eventService.resetUserDebt(user).subscribe();
    console.log('+_+_+ user => ', user);
  }

}
