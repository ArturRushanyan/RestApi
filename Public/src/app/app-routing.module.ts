import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { AddComponent } from './Pages/add/add.component';
import { ItemComponent } from './Pages/item/item.component';
import { SearchComponent } from './Pages/search/search.component';
import { UpdateComponent } from './Pages/update/update.component';
import { ShoppingCartComponent } from './Pages/shopping-cart/shopping-cart.component';
import { AllUsersTotalComponent } from './Pages/all-users-total/all-users-total.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'item',
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
    path: 'search',
    component: SearchComponent,
  }, 
  {
    path: 'update',
    component: UpdateComponent,
  }, 
  {
    path: 'shoppingcart',
    component: ShoppingCartComponent,
  }, 
  {
    path: 'allusers',
    component: AllUsersTotalComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
