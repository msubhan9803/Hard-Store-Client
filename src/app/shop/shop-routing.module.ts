import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageOutsideComponent } from './product/image-outside/image-outside.component';
import { CollectionNoSidebarComponent } from './collection/collection-no-sidebar/collection-no-sidebar.component';
import { CartComponent } from './cart/cart.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
