import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AddComponent } from './Pages/add/add.component'
import { AllUsersTotalComponent } from './Pages/all-users-total/all-users-total.component'
import { DetailViewComponent } from './Pages/detail-view/detail-view.component'
import { ItemComponent } from './Pages/item/item.component'
import { LoginComponent } from './Pages/login/login.component'
import { RegisterComponent } from './Pages/register/register.component'
import { SearchComponent } from './Pages/search/search.component'
import { ShoppingCartComponent } from './Pages/shopping-cart/shopping-cart.component'
import { UpdateComponent } from './Pages/update/update.component'

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
  },
  {
    path: 'detailview/:title/:type',
    component: DetailViewComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
