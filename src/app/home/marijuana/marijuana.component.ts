import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ProductSlider } from '../../shared/data/slider';
import { Product } from '../../shared/classes/product';
import { ProductService } from '../../shared/services/product.service';
import { BlogService } from 'src/app/shared/services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { HelperMethodsService } from 'src/app/shared/services/helper-methods.service';

@Component({
  selector: 'app-marijuana',
  templateUrl: './marijuana.component.html',
  styleUrls: ['./marijuana.component.scss']
})
export class MarijuanaComponent implements OnInit, OnDestroy {

  // public themeLogo: string = 'assets/images/icon/logo-3.png';
  public themeLogo: string = 'assets/images/logo-new.png';
  // public themeFooterLogo: string = 'assets/images/icon/logo-9.png';
  public themeFooterLogo: string = 'assets/images/footer-enlarged.png';

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
  ) {
    // this.productService.getProducts.subscribe(response => {
    //   this.products = response.filter(item => item.type == 'marijuana');
    //   // Get Product Collection
    //   this.products.filter((item) => {
    //     item.collection.filter((collection) => {
    //       const index = this.productCollections.indexOf(collection);
    //       if (index === -1) this.productCollections.push(collection);
    //     })
    //   })
    // });
  }

  public sliders = [{
    title: '',
    subTitle: 'Buy UAESlimmers',
    // image: 'assets/images/slider/28.jpg'
    image: 'assets/images/banner-1.jpg'
  }, {
    title: '',
    subTitle: 'Buy UAESlimmers',
    // image: 'assets/images/slider/28.jpg'
    image: 'assets/images/banner-2.jpg'
  }
  ];

  // Blog
  public blogs = [];

  async ngOnInit(): Promise<void> {
    // Change color for this layout
    document.documentElement.style.setProperty('--theme-deafult', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient1', '#5d7227');
    document.documentElement.style.setProperty('--theme-gradient2', '#203f15');

    await this.productService.getAllProductsAPI().toPromise().then(
      (res: []) => {
        this.products = res;
      }
    );

    await this.blogService.getBlogs().subscribe((res: []) => this.blogs = res);
  }

  ngOnDestroy(): void {
    // Remove Color
    document.documentElement.style.removeProperty('--theme-deafult');
    document.documentElement.style.removeProperty('--theme-gradient1');
    document.documentElement.style.removeProperty('--theme-gradient2');
  }

  // Product Tab collection
  getCollectionProducts(collection) {
    return this.products.filter((item) => {
      if (item.collections.includes(collection)) {
        return item;
      }
    })
  }
}