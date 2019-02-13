import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CookieService } from 'ngx-cookie-service'
import { Observable } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { HelpService } from '../../Services/help.service'
import { PassingDataService } from '../../Services/passing_data_service'

@Component({
  selector: 'sweetbox-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  public searchingItemName: string
  public userMustPayData: string
  public autocompleteName: string[] = []


  constructor(private _cookieService: CookieService,
              private _passingDataService: PassingDataService,
              private _helpService: HelpService,
              private _router: Router) { }

  public ngOnInit(): void {
    this.userMustPayData = localStorage.getItem('mustPay')
    this._passingDataService.getAutocimpleteNames().subscribe(res => this.autocompleteName = res)
  }

  public searchingItem(): void {
    this._passingDataService.setSearchingItemName(this.searchingItemName)
    this._router.navigateByUrl('/search')
  }

  public logoutUser(): void {
    this._cookieService.deleteAll()
    localStorage.clear()
    this._router.navigateByUrl('/item')
  }

  public isAdmin(): boolean {
    return !!this._helpService.isAdmin()
  }

  public loggedIn(): boolean {
    return !!this._helpService.loggedIn()
  }

  public formatter = (result: string) => result.toUpperCase()

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.autocompleteName.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )
}
