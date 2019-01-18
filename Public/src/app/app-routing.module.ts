import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { AddComponent } from './Pages/add/add.component';
import { ItemComponent } from './Pages/item/item.component';
import { SearchComponent } from './Pages/search/search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/item',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'item',
    component: ItemComponent,
  },
  {
    path:'search',
    component: SearchComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
