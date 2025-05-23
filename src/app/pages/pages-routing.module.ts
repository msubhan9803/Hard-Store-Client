import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistComponent } from './account/wishlist/wishlist.component';
import { CartComponent } from './account/cart/cart.component';
import { ContactComponent } from './account/contact/contact.component';
import { CheckoutComponent } from './account/checkout/checkout.component';
import { ErrorComponent } from './error/error.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { FaqComponent } from './faq/faq.component';
import { BlogNoSidebarComponent } from './blog/blog-no-sidebar/blog-no-sidebar.component';
import { BlogDetailsComponent } from './blog/blog-details/blog-details.component';

const routes: Routes = [
  { 
    path: 'faq', 
    component: FaqComponent 
  },
  { 
    path: 'blogs', 
    component: BlogNoSidebarComponent 
  },
  { 
    path: 'blog/:id', 
    component: BlogDetailsComponent 
  },
  { 
    path: 'contact', 
    component: ContactComponent 
  },
  { 
    path: '404', 
    component: ErrorComponent 
  },
  // { 
  //   path: 'cart', 
  //   component: CartComponent 
  // },
  // { 
  //   path: 'checkout', 
  //   component: CheckoutComponent 
  // },
  // { 
  //   path: 'comingsoon', 
  //   component: ComingSoonComponent 
  // },
  // { 
  //   path: 'wishlist', 
  //   component: WishlistComponent 
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
