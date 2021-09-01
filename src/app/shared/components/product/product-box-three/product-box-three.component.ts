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
  @Input() product: Product;
  @Input() currency: any = this.productService.Currency; // Default Currency
  @Input() cartModal: boolean = false; // Default False

  @ViewChild("quickView") QuickView: QuickViewComponent;
  @ViewChild("cartModal") CartModal: CartModalComponent;
  public imageAddress = "";
  public conversionRate;

  constructor(
    private productService: ProductService,
    private router: Router,
    public userService: UserService,
    public toastService: ToastService
  ) { }

  async ngOnInit(): Promise<void> {
    this.imageAddress = this.productService.getImageUrl();
    await this.userService.getCurrency().toPromise().then((res: any) => {
      this.conversionRate = res.conversionRate;
    })
  }

  // addToCart(product: any) {
  //   this.productService.addToCart(product);
  // }

  // Add to cart
  async addToCart(product: any, variantIndex: number) {
    let quantity = 1;
    const status = await this.productService.addToCart(product, quantity, variantIndex);
    // if (status)
    //   this.router.navigate(['/shop/cart']);
  }

  addToWishlist(product: any) {
    this.productService.addToWishlist(product);
  }

  addToCompare(product: any) {
    this.productService.addToCompare(product);
  }

}
