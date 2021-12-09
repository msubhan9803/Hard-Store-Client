import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/classes/product';
import { ProductSlider } from 'src/app/shared/data/slider';
import { BlogService } from 'src/app/shared/services/blog.service';
import { HelperMethodsService } from 'src/app/shared/services/helper-methods.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.scss']
})
export class CategoryProductsComponent implements OnInit {
  public products: Product[] = [];
  public productCollections: any[] = [
    "All",
    "On Sale",
    // "New",
    "Best Seller",
  ];

  public ProductSliderConfig: any = ProductSlider;

  constructor(
    public productService: ProductService,
    public blogService: BlogService,
    public helperMethodsService: HelperMethodsService,
    private route: ActivatedRoute
  ) { }

  async ngOnInit(): Promise<void> {
    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient1', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient2', '#203f15');

    await this.productService.getAllProductsAPI().toPromise().then(
      (res: []) => {
        this.products = res.concat(res);

        console.log("getCollectionProducts(collection): ", this.productCollections.forEach((collection, index) => console.log("index: " + index + " collection: " + collection, this.getCollectionProducts(collection))))
      }
    );
  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty('--theme-deafult');
    document.documentElement.style.removeProperty('--theme-gradient1');
    document.documentElement.style.removeProperty('--theme-gradient2');
  }

  // Product Tab collection
  getCollectionProducts(collection: any) {
    return this.products.filter((item: any) => {
      if (item.collections.includes(collection)) {
        return item;
      }
    })
  }
}