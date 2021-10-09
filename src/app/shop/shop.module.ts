import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxPayPalModule } from 'ngx-paypal';
import { Ng5SliderModule } from 'ng5-slider';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SharedModule } from '../shared/shared.module';
import { ShopRoutingModule } from './shop-routing.module';

// Product Details Components
import { ImageOutsideComponent } from './product/image-outside/image-outside.component';

// Product Details Widgest Components
import { ServicesComponent } from './product/widgets/services/services.component';
import { CountdownComponent } from './product/widgets/countdown/countdown.component';
import { SocialComponent } from './product/widgets/social/social.component';
import { StockInventoryComponent } from './product/widgets/stock-inventory/stock-inventory.component';
import { RelatedProductComponent } from './product/widgets/related-product/related-product.component';

// Collection Components
import { CollectionNoSidebarComponent } from './collection/collection-no-sidebar/collection-no-sidebar.component';

// Collection Widgets
import { GridComponent } from './collection/widgets/grid/grid.component';
import { PaginationComponent } from './collection/widgets/pagination/pagination.component';
import { BrandsComponent } from './collection/widgets/brands/brands.component';
import { ColorsComponent } from './collection/widgets/colors/colors.component';
import { SizeComponent } from './collection/widgets/size/size.component';
import { PriceComponent } from './collection/widgets/price/price.component';

import { CartComponent } from './cart/cart.component';
import { CompareComponent } from './compare/compare.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HelperMethodsService } from '../shared/services/helper-methods.service';
import { RatingBlockComponent } from './product/widgets/rating-block/rating-block.component';
import { OrderSuccessComponent } from './order-success/order-success.component';


@NgModule({
  declarations: [
    ImageOutsideComponent,
    ServicesComponent,
    CountdownComponent,
    SocialComponent,
    StockInventoryComponent,
    RelatedProductComponent,
    CollectionNoSidebarComponent,
    GridComponent,
    PaginationComponent,
    BrandsComponent,
    ColorsComponent,
    SizeComponent,
    PriceComponent,
    CartComponent,
    CompareComponent,
    CheckoutComponent,
    RatingBlockComponent,
    OrderSuccessComponent
  ],
  providers: [
    HelperMethodsService
  ],
  imports: [
    CommonModule,
    NgxPayPalModule,
    Ng5SliderModule,
    InfiniteScrollModule,
    SharedModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
