import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { PassingDataService } from '../../Services/passing_data_service';
import { HelpService } from '../../Services/help.service';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public searchingItemName: string;
  public userMustPayData: string;
  constructor(private _cookieService: CookieService,
              private _passingDataService: PassingDataService,
              private _helpService: HelpService,
              private _router: Router) { }

  ngOnInit() {
    this.userMustPayData = localStorage.getItem('mustPay');
  }

  searchingItem(): void {
    this._passingDataService.setSearchingItemName(this.searchingItemName);
    this._router.navigateByUrl('/search');
  }

  logoutUser(): void {
    this._cookieService.deleteAll();
    localStorage.clear();
    window.location.reload();
  }

  isAdmin(): boolean {
    return !!this._helpService.isAdmin();
  }

  loggedIn(): boolean {
    return !!this._helpService.loggedIn();
  }

}
