import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassingDataService } from '../../Services/passing_data_service';
import { EventService } from '../../Services/event.service';
import { Item } from 'src/app/Interfaces/Item';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private _updateService: PassingDataService,
              private _eventService: EventService,
              private _router: Router) { }

  public itemForUpdate: Item;
  private userRole: string;
  private userEmail: string;
  ngOnInit(): void {
    this.itemForUpdate = this._updateService.getUpdatingItem();
  }

  updateItem(): void {
    this.userRole = localStorage.getItem('userRole');
    if (this.userRole === 'admin') {
      this.userEmail = localStorage.getItem('userEmail');
      this._eventService.updateItem(this.itemForUpdate, this.userEmail).subscribe(
        res => {
          this._router.navigateByUrl('/item');
          console.log(res);
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this._router.navigateByUrl('/item');
    } 
  }
  
}
