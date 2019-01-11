import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from  './Pages/register/register.component';
import { LoginComponent } from './Pages/login/login.component';
import { AuthService } from  './Services/auth.service';
import { AddComponent } from './Pages/add/add.component';
import { ItemComponent } from './Pages/item/item.component';
import { EventService } from './Services/event.service';
import { CookieService } from 'ngx-cookie-service';
import { SearchService } from './Services/search.service';
import { SearchComponent } from './Pages/search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddComponent,
    ItemComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, EventService, SearchService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
