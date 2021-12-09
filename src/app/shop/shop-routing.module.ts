import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageOutsideComponent } from './product/image-outside/image-outside.component';
import { CollectionNoSidebarComponent } from './collection/collection-no-sidebar/collection-no-sidebar.component';
import { CartComponent } from './cart/cart.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CollectionLeftSidebarComponent } from './collection/collection-left-sidebar/collection-left-sidebar.component';

const routes: Routes = [
  {
    path: 'product/image/outside/:id',
    component: ImageOutsideComponent,
    // resolve: {
    //   data: Resolver
    // }
  },
  {
    path: 'collection/no/sidebar',
    component: CollectionNoSidebarComponent
  },
  {
    path: 'collection/left/sidebar',
    component: CollectionLeftSidebarComponent
  },
  {
    path: 'compare',
    component: CompareComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },

  {
    path: 'checkout',
    component: CheckoutComponent
  },
  { 
    path: 'order/success/:id', 
    component: OrderSuccessComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
