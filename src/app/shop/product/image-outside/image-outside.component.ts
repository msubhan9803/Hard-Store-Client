import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsMainSlider, ProductDetailsThumbSlider, ProductSlider, ProductVariantsThumbSlider } from '../../../shared/data/slider';
import { Product } from '../../../shared/classes/product';
import { ProductService } from '../../../shared/services/product.service';
import { SizeModalComponent } from "../../../shared/components/modal/size-modal/size-modal.component";
import { HelperMethodsService } from 'src/app/shared/services/helper-methods.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/shared/services/user.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-image-outside',
  templateUrl: './image-outside.component.html',
  styleUrls: ['./image-outside.component.scss']
})
export class ImageOutsideComponent implements OnInit {

  public product: any = {};
  public counter: number = 1;
  public activeSlide: any = 0;
  public selectedSize: any;
  public productId = "";
  public currentVariant = 0;
  public currentVariantImage = 0;
  public imageAddress = "";
  @Input() currency: any = this.productService.Currency;
  public products: Product[] = [];
  public reviewForm: FormGroup;
  public isSubmit = false;
  public conversionRate;

  @ViewChild("sizeChart") SizeChart: SizeModalComponent;

  public ProductDetailsMainSliderConfig: any = ProductDetailsMainSlider;
  public ProductDetailsThumbConfig: any = ProductDetailsThumbSlider;
  public ProductVariantsThumbSlider: any = ProductVariantsThumbSlider;
  public ProductSlider: any = ProductSlider;
  public reviewsArray = [];
  public productCollections: any[] = [
    "On Sale",
    "New",
    "All",
    "Best Seller",
  ];

  max = 5;
  rate = 5;
  isReadonly = false;

  overStar: number | undefined;
  // percent = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productService: ProductService,
    public userService: UserService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    public helperMethodsService: HelperMethodsService
  ) {
    this.route.data.subscribe(response => this.product = response.data);
    this.counter = 1;
  }

  async ngOnInit(): Promise<void> {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.imageAddress = this.productService.getImageUrl();

      this.conversionRate = localStorage.getItem("hrdtkr_conversionRate")

    this.productService.getProductBySlugApi(this.productId).subscribe(
      res => {
        this.product = res;
        let discountPer = 100 - ((this.product?.price - this.product?.discount) / this.product?.price * 100);
        discountPer = parseFloat(discountPer.toFixed(2));
        this.product.discountPer = discountPer;

        this.productService.averageRating(this.product._id).subscribe((res: any) => {
          this.product.starAvg = parseInt(res.starAvg);
          this.product.totalReviews = parseInt(res.totalReviews);
        })
        this.productService.getReviewsByProductId(this.product._id).subscribe(
          (res: []) => {
            this.reviewsArray = res;
          }
        )
      }
    )
    this.productService.getAllProductsAPI().subscribe(
      (res: []) => {
        this.products = res.concat(res);
      }
    );

    this.createReviewForm();
  }

  onReviewSubmit() {
    this.isSubmit = true;
    if (this.reviewForm.invalid) return;

    this.spinner.show();
    let payload = this.reviewForm.value;
    payload.ProductId = this.product._id;

    this.productService.writeReview(payload).subscribe(
      res => {
        this.spinner.hide();
        Swal.fire({
          icon: 'success',
          title: 'Successfully Added Review',
          showConfirmButton: false,
          timer: 1500
        });
        window.location.reload();
      },
      err => {
        this.spinner.hide();
        Swal.fire({
          icon: 'error',
          title: err.error.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    )
  }

  createReviewForm() {
    this.reviewForm = this.fb.group({
      ProductId: [""],
      Name: ["", Validators.required],
      Title: ["", Validators.required],
      Email: ["", Validators.required],
      Comment: ["", Validators.required],
      Rating: [5, Validators.required],
    })
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
    let quantity = this.counter > 1 ? this.counter : 1;
    const status = await this.productService.addToCart(product, quantity);
    // if(status)
    //   this.router.navigate(['/cart']);
  }

  // Buy Now
  async buyNow(product: any, variantIndex: number) {
    let quantity = this.counter || 1;
    const status = await this.productService.addToCart(product, quantity);
    if (status)
      this.router.navigate(['/checkout']);
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

  hoveringOver(value: number): void {
    this.overStar = value;
    // this.percent = (value / this.max) * 100;
  }

  resetStar(): void {
    this.overStar = void 0;
  }
}
