import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider, ProductSlider, ProductVariantsThumbSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { SizeModalComponent } from "../../../shared/components/modal/size-modal/size-modal.component";
import { HelperMethodsService } from 'src/app/shared/services/helper-methods.service';

@Component({
  selector: 'app-image-outside',
  templateUrl: './image-outside.component.html',
  styleUrls: ['./image-outside.component.scss']
})
export class ImageOutsideComponent implements OnInit {

  public product: Product = {};
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public productId = "";
  public currentVariant = 0;
  public currentVariantImage = 0;
  public imageAddress = "";
  @Input() currency: any = this.productService.Currency;
  public products: Product[] = [];

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  public ProductVariantsThumbSlider: any = ProductVariantsThumbSlider;
  public ProductSlider: any = ProductSlider;
  public productCollections: any[] = [
    "On Sale",
    "New",
    "All",
    "Best Seller",
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    public helperMethodsService: HelperMethodsService
  ) {
    this.route.data.subscribe(response => this.product = response.data);
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.imageAddress = this.productService.getImageUrl();

    this.productService.getAllProductsById(this.productId).subscribe(
      res => {
        this.product = res;
        // this.currentVariantImage = this.product.variants[this.currentVariant].isThumbnailImageIndex;
      }
    )
    this.productService.getAllProductsAPI().subscribe(
      (res: []) => {
        console.log("res: ", res)
        this.products = res;
      }
    );
  }

  // Get Product Color
  Color(variants) {
    const uniqColor = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqColor.indexOf(variants[i].color) === -1 && variants[i].color) {
        uniqColor.push(variants[i].color)
      }
    }
    return uniqColor
  }

  // Get Product Size
  Size(variants) {
    const uniqSize = []
    for (let i = 0; i < Object.keys(variants).length; i++) {
      if (uniqSize.indexOf(variants[i].size) === -1 && variants[i].size) {
        uniqSize.push(variants[i].size)
      }
    }
    return uniqSize
  }

  selectSize(size) {
    this.selectedSize = size;
  }

  // Increament
  increment() {
    this.counter++;
  }

  // Decrement
  decrement() {
    if (this.counter > 1) this.counter--;
  }

  // Add to cart
  async addToCart(product: any, variantIndex: number) {
    let quantity = this.counter || 1;
    const status = await this.productService.addToCart(product, quantity, variantIndex);
    // if(status)
    //   this.router.navigate(['/shop/cart']);
  }

  // Buy Now
  async buyNow(product: any, variantIndex: number) {
    let quantity = this.counter || 1;
    const status = await this.productService.addToCart(product, quantity, variantIndex);
    if (status)
      this.router.navigate(['/shop/checkout']);
  }

  // Add to Wishlist
  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  changeVariant(variantIndex) {
    this.currentVariant = variantIndex;
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
