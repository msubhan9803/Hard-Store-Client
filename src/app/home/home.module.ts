import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { HomeRoutingModule } from "./home-routing.module";

import { MarijuanaComponent } from "./marijuana/marijuana.component";

// Widgest Components
import { SliderComponent } from "./widgets/slider/slider.component";
import { BlogComponent } from "./widgets/blog/blog.component";
import { LogoComponent } from "./widgets/logo/logo.component";
import { ServicesComponent } from "./widgets/services/services.component";
import { CollectionComponent } from "./widgets/collection/collection.component";
import { LandingPageComponent } from './landing-page/landing-page.component';
import { CategoriesGridComponent } from './widgets/categories-grid/categories-grid.component';
import { CategoryProductsComponent } from './widgets/category-products/category-products.component';
import { ProductSliderComponent } from './widgets/product-slider/product-slider.component';

@NgModule({
  declarations: [
    MarijuanaComponent,
    // Widgest Components
    SliderComponent,
    BlogComponent,
    LogoComponent,
    ServicesComponent,
    CollectionComponent,
    LandingPageComponent,
    CategoriesGridComponent,
    CategoryProductsComponent,
    ProductSliderComponent,
  ],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
