import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../Services/event.service';
import { CookieService } from 'ngx-cookie-service';
import { Item } from 'src/app/Interfaces/Item';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  private userEmail: string;
  addUserData:Item = {
    _id: 0,
    type: '',
    title: '',
    price: 0,
    count: 1,
    barcode: ''
  };
  constructor(private _event: EventService,
    private _router: Router,
    private _cookieService: CookieService) { }

  ngOnInit() :void {
    this.userEmail = localStorage.getItem('userEmail');
  }

  addData(): void {
    console.log('+_+_+_+_+_+ try function');
    console.log('+_+_+ user Email. from local', this.userEmail);
    this._event.addItem(this.addUserData, this.userEmail)
      .subscribe(
        res => {
          console.log('+_+_+_+', res);
          this._router.navigate(['/item']);
        },
        err => console.log(err)
      )
  }

}
