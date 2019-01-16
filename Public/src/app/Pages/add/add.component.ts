import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../Services/event.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public addUserData = {}
  public userEmail: string;
  constructor(private _event: EventService,
              private _router: Router) { }

  ngOnInit(): void {
    const _token = localStorage.getItem('token');
  }

  addData(): void {
    this.userEmail = localStorage.getItem('userEmail');
    this._event.addItem(this.addUserData, this.userEmail)
      .subscribe(
        res => {
          console.log(res);
          this._router.navigate(['/item']);
        },
        err => console.log(err)
      )
  }

}
