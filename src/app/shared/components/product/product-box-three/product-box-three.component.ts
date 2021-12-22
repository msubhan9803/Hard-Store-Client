import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { QuickViewComponent } from "../../modal/quick-view/quick-view.component";
import { CartModalComponent } from "../../modal/cart-modal/cart-modal.component";
import { Product } from "../../../classes/product";
import { ProductService } from "../../../services/product.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-product-box-three',
  templateUrl: './product-box-three.component.html',
  styleUrls: ['./product-box-three.component.scss']
})

export class ProductBoxThreeComponent implements OnInit {
  @Input() product: any;
  @Input() currency: any = this.productService.Currency; // Default Currency
  @Input() cartModal: boolean = false; // Default False
  public imageAddress = "";

  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;
  public imageUrl = "";
  public conversionRate;

  constructor(
    private productService: ProductService,
    private router: Router,
    public userService: UserService,
    public toastService: ToastService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.imageAddress = this.productService.getImageUrl();
      this.conversionRate = localStorage.getItem("hrdtkr_conversionRate")
    this.imageUrl = this.imageAddress + this.product.images.find((image: any) => image.IsThmubnail == true).URL;
    // console.log("imageUrl: ", this.imageUrl)
  }

  // addToCart(product: any) {
  //   this.productService.addToCart(product);
  // }

  // Add to cart
  async addToCart(product: any) {
    let quantity = 1;
    const status = await this.productService.addToCart(product, quantity);
    // if (status)
    //   this.router.navigate(['/cart']);
  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  addToCompare(product: any) {
    this.productService.addToCompare(product);
  }
}