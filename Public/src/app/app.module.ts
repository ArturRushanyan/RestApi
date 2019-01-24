import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { AddComponent } from './Pages/add/add.component';
import { ItemComponent } from './Pages/item/item.component';
import { SearchComponent } from './Pages/search/search.component';
import { UpdateComponent } from './Pages/update/update.component';

import { AuthService } from './Services/auth.service';
import { EventService } from './Services/event.service';
import { UpdateItemService } from './Services/update-item.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddComponent,
    ItemComponent,
    SearchComponent,
    UpdateComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, EventService, CookieService, UpdateItemService],
  bootstrap: [AppComponent]
})
export class AppModule { }
