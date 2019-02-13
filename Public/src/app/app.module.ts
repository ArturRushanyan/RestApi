import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { CookieService } from 'ngx-cookie-service'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AddComponent } from './Pages/add/add.component'
import { ItemComponent } from './Pages/item/item.component'
import { LoginComponent } from './Pages/login/login.component'
import { RegisterComponent } from './Pages/register/register.component'
import { SearchComponent } from './Pages/search/search.component'
import { UpdateComponent } from './Pages/update/update.component'

import { ItemTemplateComponent } from './Components/item-template/item-template.component'
import { NavBarComponent } from './Components/nav-bar/nav-bar.component'
import { AllUsersTotalComponent } from './Pages/all-users-total/all-users-total.component'
import { ShoppingCartComponent } from './Pages/shopping-cart/shopping-cart.component'
import { AuthService } from './Services/auth.service'
import { EventService } from './Services/event.service'
import { HelpService } from './Services/help.service'
import { PassingDataService } from './Services/passing_data_service'


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddComponent,
    ItemComponent,
    SearchComponent,
    UpdateComponent,
    NavBarComponent,
    ShoppingCartComponent,
    ItemTemplateComponent,
    AllUsersTotalComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, EventService, CookieService, HelpService, PassingDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
