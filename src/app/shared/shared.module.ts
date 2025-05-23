import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BarRatingModule } from "ngx-bar-rating";
import { LazyLoadImageModule, scrollPreset } from 'ng-lazyload-image';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TranslateModule } from '@ngx-translate/core';

// Header and Footer Components
import { HeaderOneComponent } from './header/header-one/header-one.component';
import { FooterOneComponent } from './footer/footer-one/footer-one.component';
import { HeaderTwoComponent } from './header/header-two/header-two.component';
import { FooterTwoComponent } from './footer/footer-two/footer-two.component';
import { HeaderThreeComponent } from './header/header-three/header-three.component';
import { FooterThreeComponent } from './footer/footer-three/footer-three.component';
import { HeaderFourComponent } from './header/header-four/header-four.component';
import { FooterFourComponent } from './footer/footer-four/footer-four.component';

// Components
import { LeftMenuComponent } from './components/left-menu/left-menu.component';
import { MenuComponent } from './components/menu/menu.component';
import { SettingsComponent } from './components/settings/settings.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { ProductBoxOneComponent } from './components/product/product-box-one/product-box-one.component';
import { ProductBoxTwoComponent } from './components/product/product-box-two/product-box-two.component';
import { ProductBoxThreeComponent } from './components/product/product-box-three/product-box-three.component';
import { ProductBoxFourComponent } from './components/product/product-box-four/product-box-four.component';
import { ProductBoxFiveComponent } from './components/product/product-box-five/product-box-five.component';
import { ProductBoxVerticalComponent } from './components/product/product-box-vertical/product-box-vertical.component';
import { ProductBoxVerticalSliderComponent } from './components/product/product-box-vertical-slider/product-box-vertical-slider.component';

// Modals Components
import { NewsletterComponent } from './components/modal/newsletter/newsletter.component';
import { QuickViewComponent } from './components/modal/quick-view/quick-view.component';
import { CartModalComponent } from './components/modal/cart-modal/cart-modal.component';
import { CartVariationComponent } from './components/modal/cart-variation/cart-variation.component';
import { VideoModalComponent } from './components/modal/video-modal/video-modal.component';
import { SizeModalComponent } from './components/modal/size-modal/size-modal.component';
import { AgeVerificationComponent } from './components/modal/age-verification/age-verification.component';

// Skeleton Loader Components
import { SkeletonProductBoxComponent } from './components/skeleton/skeleton-product-box/skeleton-product-box.component';

// Layout Box
import { LayoutBoxComponent } from './components/layout-box/layout-box.component';

// Tap To Top
import { TapToTopComponent } from './components/tap-to-top/tap-to-top.component';

// Pipes
import { DiscountPipe } from './pipes/discount.pipe';
import { EnvironmentUrlService } from './services/enviroment-url.service';
import { HttpClientModule } from '@angular/common/http';
import { HelperMethodsService } from './services/helper-methods.service';
import { ToastService } from './services/toast.service';
import { BlogService } from './services/blog.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { RatingModule } from 'ngx-bootstrap/rating';
import { NgxPayPalModule } from 'ngx-paypal';
import { AedToDollarPipe } from './pipes/aed-to-dollar.pipe';
import {Ng2TelInputModule} from 'ng2-tel-input';
import { CheckoutService } from './services/checkout.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PageTitleComponent } from './components/page-title/pagetitle.component';
import { TimeagoModule } from 'ngx-timeago';
import { HeaderFiveComponent } from './header/header-five/header-five.component';
import { FooterFiveComponent } from './footer/footer-five/footer-five.component';
import { SettingsTwoComponent } from './components/settings-two/settings-two.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    HeaderOneComponent,
    FooterOneComponent,
    HeaderTwoComponent,
    FooterTwoComponent,
    HeaderThreeComponent,
    FooterThreeComponent,
    HeaderFourComponent,
    FooterFourComponent,
    LeftMenuComponent,
    MenuComponent,
    SettingsComponent,
    SettingsTwoComponent,
    BreadcrumbComponent,
    CategoriesComponent,
    CategoriesComponent,
    ProductBoxOneComponent,
    ProductBoxTwoComponent,
    ProductBoxThreeComponent,
    ProductBoxFourComponent,
    ProductBoxFiveComponent,
    ProductBoxVerticalComponent,
    ProductBoxVerticalSliderComponent,
    NewsletterComponent,
    QuickViewComponent,
    CartModalComponent,
    CartVariationComponent,
    VideoModalComponent,
    SizeModalComponent,
    AgeVerificationComponent,
    SkeletonProductBoxComponent,
    LayoutBoxComponent,
    TapToTopComponent,
    PageTitleComponent,
    DiscountPipe,
    AedToDollarPipe,
    HeaderFiveComponent,
    FooterFiveComponent,
    CollectionsComponent
  ],
  providers: [
    EnvironmentUrlService,
    HelperMethodsService,
    ToastService,
    ProductService,
    OrderService,
    BlogService,
    CheckoutService,
    CurrencyPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    BarRatingModule,
    HttpClientModule,
    LazyLoadImageModule.forRoot({
      // preset: scrollPreset // <-- tell LazyLoadImage that you want to use scrollPreset
    }),
    NgxSkeletonLoaderModule,
    TranslateModule,
    NgxIntlTelInputModule,
    RatingModule.forRoot(),
    NgxPayPalModule,
    Ng2TelInputModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
    TimeagoModule.forRoot(),
    NgxSpinnerModule,
    QuillModule.forRoot()
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    CarouselModule,
    BarRatingModule,
    LazyLoadImageModule,
    NgxSkeletonLoaderModule,
    NgxIntlTelInputModule,
    HttpClientModule,
    TranslateModule,
    RatingModule,
    NgxPayPalModule,
    HeaderOneComponent,
    FooterOneComponent,
    HeaderTwoComponent,
    FooterTwoComponent,
    RouterModule,
    HeaderThreeComponent,
    FooterThreeComponent,
    HeaderFourComponent,
    FooterFourComponent,
    BreadcrumbComponent,
    CategoriesComponent,
    CollectionsComponent,
    ProductBoxOneComponent,
    ProductBoxTwoComponent,
    ProductBoxThreeComponent,
    ProductBoxFourComponent,
    ProductBoxFiveComponent,
    ProductBoxVerticalComponent,
    ProductBoxVerticalSliderComponent,
    NewsletterComponent,
    QuickViewComponent,
    CartModalComponent,
    CartVariationComponent,
    VideoModalComponent,
    SizeModalComponent,
    AgeVerificationComponent,
    SkeletonProductBoxComponent,
    LayoutBoxComponent,
    TapToTopComponent,
    PageTitleComponent,
    DiscountPipe,
    AedToDollarPipe,
    Ng2TelInputModule,
    NgSelectModule,
    NgxMaskModule,
    NgMultiSelectDropDownModule,
    TimeagoModule,
    HeaderFiveComponent,
    FooterFiveComponent,
    SettingsTwoComponent,
    NgxSpinnerModule,
    QuillModule
  ]
})
export class SharedModule { }
